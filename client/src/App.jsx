import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import "./App.css"
import Register from "./Auth/Register"
import Login from "./Auth/Login"
import Dashboard from "./pages/Dashboard"
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from "./Contexts/AuthContext"

const App = () => {
  const { token } = useAuth()

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!token ? <Register /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  )
}

export default App
