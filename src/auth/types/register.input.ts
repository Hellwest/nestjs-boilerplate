import { Field, InputType } from "@nestjs/graphql"

@InputType({ description: "Sign up data" })
export class RegisterInput {
  @Field({ description: "User's login" })
  login: string

  @Field({ description: "User's password" })
  password: string
}
