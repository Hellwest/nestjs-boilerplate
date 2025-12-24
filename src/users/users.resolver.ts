import { Query, Resolver } from "@nestjs/graphql"
import { GraphQLInt } from "graphql"

import { UsersService } from "./users.service"

@Resolver("users")
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((): typeof GraphQLInt => GraphQLInt, {
    name: "test",
    description: "test",
  })
  async test(): Promise<void> {
    return await this.usersService.test()
  }
}
