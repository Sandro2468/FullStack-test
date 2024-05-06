import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { UserSchema } from "./dto"

const useSignupForm = ({ onSubmit }) => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(UserSchema),
  })

  const doSignup = (dto) => {
    onSubmit?.(dto)
  }

  return { ...form, doSignup }
}

export default useSignupForm
