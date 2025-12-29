import { Field, ID, ObjectType } from "@nestjs/graphql"
import { GraphQLScalarType } from "graphql"

import { User } from "../../users/user.entity"

@ObjectType({ description: "User's general information object" })
export class AuthType {
  constructor(user: User) {
    Object.assign(this, {
      userId: user.id,
      login: user.login,
      createdAt: user.createdAt,
    })
  }

  @Field((): GraphQLScalarType => ID, { description: "User ID" })
  userId: string

  @Field({ description: "User login" })
  login: string

  @Field({ description: "User registration date" })
  createdAt: Date
}
