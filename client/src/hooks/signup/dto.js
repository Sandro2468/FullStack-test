import { z } from "zod"

export const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .refine(
      (value) => {
        return /[A-Z]/.test(value)
      },
      { message: "Password must contain at least one uppercase letter" }
    )
    .refine(
      (value) => {
        return /\d/.test(value)
      },
      { message: "Password must contain at least one digit" }
    )
    .refine(
      (value) => {
        return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)
      },
      { message: "Password must contain at least one symbol" }
    ),
})
