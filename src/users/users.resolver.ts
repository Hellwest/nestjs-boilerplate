import { Query, Resolver } from "@nestjs/graphql"
import { GraphQLInt, GraphQLScalarType } from "graphql"

import { UsersService } from "./users.service"

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((): GraphQLScalarType => GraphQLInt, {
    name: "test",
    description: "test",
  })
  async test(): Promise<void> {
    return await this.usersService.test()
  }
}
