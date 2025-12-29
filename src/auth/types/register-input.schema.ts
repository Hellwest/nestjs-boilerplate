import * as z from "zod"

export const RegisterInputSchema = z.object({
  login: z
    .string("general.required")
    .trim()
    .min(1, "general.required")
    .max(120, "general.maxLength"),
  password: z
    .string()
    .regex(/^\S*$/, { message: "general.forbiddenSpaces" })
    .min(6, "general.passwordIsShort")
    .max(18, "general.passwordIsLong"),
})
