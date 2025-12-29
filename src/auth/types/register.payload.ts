import { GraphQLScalarType } from "graphql"
import { Field, ID, ObjectType } from "@nestjs/graphql"

import { AuthType } from "./auth.type"

@ObjectType({ description: "Payload for registering a user" })
export class RegisterPayload {
  constructor({ recordId, record }: { recordId: string; record: AuthType }) {
    Object.assign(this, { recordId, record })
  }

  @Field((): GraphQLScalarType => ID, { description: "Created user's ID" })
  recordId: string

  @Field((): typeof AuthType => AuthType, { description: "Auth payload" })
  record: AuthType
}
