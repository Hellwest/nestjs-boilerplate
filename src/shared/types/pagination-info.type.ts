import { Field, Int, ObjectType } from "@nestjs/graphql"
import { GraphQLScalarType } from "graphql"

import { pagination } from "../constants/pagination"

@ObjectType()
export class PaginationInfo {
  @Field((): GraphQLScalarType => Int, { description: "Total number of pages" })
  totalPages: number

  @Field((): GraphQLScalarType => Int, { description: "Total number of items" })
  totalItems: number

  @Field((): GraphQLScalarType => Int, {
    description: "Current page number",
    defaultValue: 1,
  })
  page: number = 1

  @Field((): GraphQLScalarType => Int, {
    description: "Number of items per page",
    defaultValue: pagination.itemsPerPage,
  })
  perPage: number = pagination.itemsPerPage

  @Field({ description: "Is there more items ahead?" })
  hasNextPage: boolean

  @Field({ description: "Is there more items behind?" })
  hasPreviousPage: boolean
}
