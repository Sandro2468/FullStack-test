import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { AuthProvider } from "./Contexts/AuthContext.jsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
