const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");

// const transporter = nodemailer.createTransport({
//   host: "localhost",
//   port: 1025,
//   ignoreTLS: false,
// })

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

exports.sendEmail = async (to, subject, templateData) => {
  try {
    const templatePath = path.join(__dirname, templateData.path);

    const templateFile = fs.readFileSync(templatePath, "utf8");

    const template = handlebars.compile(templateFile);

    const html = template(templateData.variables);

    const mailOptions = {
      from: "sandro@gmail.com",
      to: to,
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};
