import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import axiosInstance from "../../utils/axios"

const useSignup = ({ onError, onSuccess }) => {
  const signup = useCallback(async (dto) => {
    const res = await axiosInstance.post(`/api/auth/signup`, dto)

    return res.data
  }, [])

  const mutation = useMutation({
    mutationKey: [`/api/auth/signup`],
    mutationFn: signup,
    onError,
    onSuccess,
  })

  return mutation
}

export default useSignup
