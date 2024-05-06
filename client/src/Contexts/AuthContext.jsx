import React, { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken")
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("accessToken")
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
