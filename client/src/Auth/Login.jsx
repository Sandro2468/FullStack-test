import React, { useState } from "react"
import { Card, Flex, Typography, Form, Input, Button, Alert } from "antd"
import { Link, useNavigate } from "react-router-dom"
import CustomNavbar from "../components/Navbar"
import useLogin from "../hooks/login/useLogin"
import useLoginForm from "../hooks/login/useLoginForm"
import { Controller } from "react-hook-form"
import toast from "react-hot-toast"
import { useAuth } from "../Contexts/AuthContext"

const Login = () => {
  const [isError, setIsError] = useState(null)

  const { setToken } = useAuth()

  const navigate = useNavigate()

  // region login
  const loginHook = useLogin({
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
      setIsError(error?.response?.data?.message ?? error?.message)
    },
  })

  const { mutate, isPending } = loginHook

  const loginForm = useLoginForm({
    onSubmit: (dto) => {
      mutate(dto)
    },
  })

  const {
    control,
    handleSubmit,
    watch,
    doLogin,
    formState: { isDirty, isValid },
  } = loginForm

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
          Welcome Back!
        </Typography.Title>
        <Typography.Title
          level={3}
          className="title"
          style={{ textAlign: "left", fontSize: "1.0rem" }}
        >
          Sign in bellow to access your workspace and continue your project.
          Let's pick up where you left off!
        </Typography.Title>

        {/* Signup Form */}
        <Form
          layout="vertical"
          noValidate
          onFinish={handleSubmit(doLogin)}
          autoComplete="off"
        >
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
                    message: "Please input a valid email address!",
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
                label={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100vw",
                    }}
                  >
                    <div style={{ flex: 1 }}>{`Password`}</div>
                    <Link to="/forgot-password" style={{ color: "black" }}>
                      Forgot?
                    </Link>
                  </div>
                }
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  value={value}
                  onChange={onChange}
                  size="large"
                  placeholder="Enter your password"
                />
              </Form.Item>
            )}
          />
          <Typography.Text
            style={{
              textAlign: "right",
              fontSize: "0.9rem",
              marginBottom: "1rem",
            }}
          ></Typography.Text>

          {isError && (
            <Alert
              description={
                <div style={{ color: "#79889D" }}>
                  {`The email and password you entered don't match. Please try again`}
                </div>
              }
              type="error"
            />
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              style={{
                backgroundColor:
                  isPending || !isDirty || !isValid || watch("password") === ""
                    ? "grey"
                    : "black",
                marginTop: "20px",
              }}
              disabled={
                isPending || !isDirty || !isValid || watch("password") === ""
              }
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        {/* Login Link */}
        <div style={{ textAlign: "center" }}>
          <Typography.Text style={{ textAlign: "right", fontSize: "1rem" }}>
            Don't have an account?{" "}
            <Link
              to="/"
              className="btn-link"
              style={{ color: "black", borderBottom: "1px solid black" }}
            >
              Sign Up
            </Link>
          </Typography.Text>
        </div>
      </Card>
    </div>
  )
}

export default Login
