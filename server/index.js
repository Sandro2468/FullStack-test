require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const authRoute = require("./routes/authRoute")
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoute)

// MongoDB connection
mongoose
  .connect(
    process.env.MONGODB_URI,
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("Failed to connect to MongoDB", error))

// Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    errors: err.errors,
  })
})

// Server
const PORT = 5555
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
