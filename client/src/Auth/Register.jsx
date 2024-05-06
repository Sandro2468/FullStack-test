import React, { useEffect, useState } from "react"
import { Card, Typography, Form, Input, Button, Spin } from "antd"
import { Link } from "react-router-dom"
import CustomNavbar from "../components/Navbar"
import useSignup from "../hooks/signup/useSignup"
import { useNavigate } from "react-router-dom"
import useSignupForm from "../hooks/signup/useSignupForm"
import { Controller } from "react-hook-form"
import UncheckCircle from "../icons/uncheckCircle"
import CheckedCircle from "../icons/checkedCircle"
import toast from "react-hot-toast"
import { useAuth } from "../Contexts/AuthContext"

const Register = () => {
  const [isValidPassword, setIsValidPassword] = useState(false)

  const { setToken } = useAuth()

  const checkPasswordValidity = () => {
    const password = watch("password")
    const hasMinimumLength = password && password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)

    setIsValidPassword(
      hasMinimumLength && hasUppercase && hasLowercase && hasNumber && hasSymbol
    )
  }

  const navigate = useNavigate()

  // region post signup
  const signupHook = useSignup({
    onSuccess: (data) => {
      const token = data?.token

      localStorage.setItem("accessToken", token)

      setToken(token)

      navigate("/dashboard")
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? error?.message, {
        position: "top-center",
      })
    },
  })

  const { mutate, isPending } = signupHook

  const signupForm = useSignupForm({
    onSubmit: (dto) => {
      mutate(dto)
    },
  })

  const {
    control,
    handleSubmit,
    watch,
    doSignup,
    formState: { isDirty, isValid },
  } = signupForm

  useEffect(() => {
    checkPasswordValidity()
  }, [watch("password")])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f1f5f9",
      }}
    >
      <CustomNavbar />

      <Card
        className="form-container"
        style={{
          maxWidth: 600,
          margin: "auto",
          backgroundColor: "#f1f5f9",
          border: "none",
        }}
      >
        {/* Header */}
        <Typography.Title
          level={3}
          className="title"
          style={{ textAlign: "left", fontSize: "1.5rem" }}
        >
          Sign up to Maia
        </Typography.Title>

        {/* Signup Form */}
        <Form
          layout="vertical"
          noValidate
          onFinish={handleSubmit(doSignup)}
          autoComplete="off"
        >
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Form.Item
                label="Your Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input
                  value={value}
                  onChange={onChange}
                  size="large"
                  placeholder="Name"
                />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "",
                  },
                ]}
              >
                <Input
                  size="large"
                  value={value}
                  onChange={onChange}
                  placeholder="Email"
                />
              </Form.Item>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <Form.Item
                label="Create Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input.Password
                  value={value}
                  onChange={onChange}
                  size="large"
                  placeholder="Password"
                />
              </Form.Item>
            )}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {watch("password")?.length >= 8 ? (
                <CheckedCircle />
              ) : (
                <UncheckCircle />
              )}
              <div
                style={{ fontSize: "14px", color: "#79889D" }}
              >{`Contains at least 8 characters`}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {watch("password") &&
              /[A-Z]/.test(watch("password")) &&
              /[a-z]/.test(watch("password")) ? (
                <CheckedCircle />
              ) : (
                <UncheckCircle />
              )}
              <div style={{ fontSize: "14px", color: "#79889D" }}>
                {`Includes both uppercase and lowercase letters`}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {watch("password") && /[0-9]/.test(watch("password")) ? (
                <CheckedCircle />
              ) : (
                <UncheckCircle />
              )}
              <div style={{ fontSize: "14px", color: "#79889D" }}>
                {`Contains numbers (e.g., 1, 2, 3)`}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {watch("password") &&
              /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
                watch("password")
              ) ? (
                <CheckedCircle />
              ) : (
                <UncheckCircle />
              )}
              <div style={{ fontSize: "14px", color: "#79889D" }}>
                {`Contains at least one symbol`}
              </div>
            </div>
          </div>
          <Form.Item>
            <Button
              type={`${isPending ? "" : "primary"}`}
              htmlType="submit"
              size="large"
              block
              style={{
                backgroundColor:
                  !isValidPassword || !isDirty || !isValid ? "grey" : "black",
                marginTop: "16px",
              }}
              disabled={!isValidPassword || !isDirty || !isValid}
            >
              {isPending ? <Spin /> : "Sign Up"}
            </Button>
          </Form.Item>
        </Form>

        {/* Login Link */}
        <div style={{ textAlign: "center" }}>
          <Typography.Text style={{ fontSize: "1rem" }}>
            By creating an account, you agree to our{" "}
            <Link
              to="/terms-of-service"
              className="btn-link"
              style={{ color: "black", borderBottom: "1px solid black" }}
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy-policy"
              className="btn-link"
              style={{
                color: "black",
                textAlign: "center",
                borderBottom: "1px solid black",
              }}
            >
              Privacy Policy
            </Link>
          </Typography.Text>
          <br />
          <Typography.Text style={{ fontSize: "1rem" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              className="btn-link"
              style={{ color: "black", borderBottom: "1px solid black" }}
            >
              Sign In
            </Link>
          </Typography.Text>
        </div>
      </Card>
    </div>
  )
}

export default Register
