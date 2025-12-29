import { Field, InputType } from "@nestjs/graphql"

@InputType({ description: "Sign in data" })
export class LoginInput {
  @Field({ description: "Login to sign in" })
  login: string

  @Field({ description: "User's password to sign in" })
  password: string
}
