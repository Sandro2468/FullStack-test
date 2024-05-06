import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import axiosInstance from "../../utils/axios"

const useLogin = ({ onError, onSuccess }) => {
  const login = useCallback(async (dto) => {
    const res = await axiosInstance.post(`/api/auth/login`, dto)

    return res.data
  }, [])

  const mutation = useMutation({
    mutationKey: [`/api/auth/login`],
    mutationFn: login,
    onError,
    onSuccess,
  })

  return mutation
}

export default useLogin
