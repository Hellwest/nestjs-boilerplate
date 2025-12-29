import { Field, ObjectType } from "@nestjs/graphql"

import { AuthType } from "./auth.type"

@ObjectType({ description: "Payload for logging in" })
export class LoginPayload {
  constructor({ token, me }: { token: string; me: AuthType }) {
    Object.assign(this, { token, me })
  }

  @Field({ description: "User token" })
  token: string

  @Field((): typeof AuthType => AuthType, { description: "Auth payload" })
  me: AuthType
}
