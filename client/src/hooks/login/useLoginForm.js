import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoginSchema } from "./dto"

const useLoginForm = ({ onSubmit }) => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  })

  const doLogin = (dto) => {
    onSubmit?.(dto)
  }

  return { ...form, doLogin }
}

export default useLoginForm
