const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const createError = require("../utils/appError")
const { sendEmail } = require("../services/mailer")
const PasswordValidator = require("password-validator")

exports.signup = async (req, res, next) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return next(new createError("User already exists", 409))
  }

  const backendPasswordValidator = new PasswordValidator()
    .is()
    .min(8)
    .has()
    .letters()
    .has()
    .digits()
    .has()
    .uppercase()
    .has()
    .symbols()

  if (password) {
    const validatePassword = backendPasswordValidator.validate(password)

    if (!validatePassword) {
      const passwordRequirement = backendPasswordValidator.validate(password, {
        details: true,
      })

      const detailsErrors = passwordRequirement.map((error) => {
        const cleanedMessage = error.message.replace("The string", "").trim()

        return {
          validation: error.validation,
          message: cleanedMessage,
        }
      })

      const error = new createError(
        "Password doesn't meet requirement",
        400,
        detailsErrors
      )

      return next(error)
    }
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  })

  await sendEmail(newUser.email, "Welcome to MAIA!", {
    path: "./templates/welcome-email.hbs",
    variables: {
      name: newUser.name,
      verificationLink: "https://example.com/verify",
    },
  })

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  })

  res.status(201).json({
    status: "success",
    message: "User created successfully",
    token,
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  })
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return next(new createError("User not found", 404))
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return next(new createError("Invalid email or password", 401))
    }

    const token = jwt.sign({ id: user._id }, "rumpinosecret", {
      expiresIn: "90d",
    })

    res.status(200).json({
      status: "success",
      token,
      message: "User logged in successfully",
      user: {
        _id: user._id,
        email: user.email,
        password: user.password,
      },
    })
  } catch (error) {
    next(error)
  }
}
