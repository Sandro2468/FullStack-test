import axios from "axios"

const axiosInstance = axios.create({
  baseURL: `http://localhost:5555`,
  timeout: 60 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance
