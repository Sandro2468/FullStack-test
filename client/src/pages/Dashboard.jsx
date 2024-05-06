import React from "react"
import { useAuth } from "../Contexts/AuthContext"
import { Card, Typography } from "antd"

import CustomNavbar from "../components/Navbar"

const Dashboard = () => {
  const { logout } = useAuth()
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f1f5f9",
      }}
    >
      <CustomNavbar logout={logout} />
      <Card
        className="form-container"
        style={{
          maxWidth: 600,
          backgroundColor: "#f1f5f9",
          border: "none",
          marginTop: "64px",
        }}
      >
        {/* Header */}
        <Typography.Title
          level={3}
          className="title"
          style={{
            textAlign: "left",
            fontSize: "1.5rem",
            marginBottom: "32px",
          }}
        >
          Dashboard
        </Typography.Title>
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "6px",
            padding: "16px",
          }}
        >
          <Typography.Title
            level={3}
            className="title"
            style={{
              textAlign: "left",
              fontSize: "14px",
              color: "#79889D",
              fontWeight: 400,
            }}
          >
            {`Welcome to your dashboard! Explore and manage your account effortlessly.`}
          </Typography.Title>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
