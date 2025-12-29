import * as z from "zod"

export const LoginInputSchema = z.object({
  login: z.string().min(1, "general.required"),
  password: z
    .string()
    .regex(/^\S*$/, { message: "general.forbiddenSpaces" })
    .min(6, "general.passwordIsShort")
    .max(18, "general.passwordIsLong"),
})
