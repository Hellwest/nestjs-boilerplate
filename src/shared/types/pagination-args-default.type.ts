import { ArgsType, Field, Int } from "@nestjs/graphql"

import { pagination } from "../constants/pagination"

@ArgsType()
export class PaginationArguments {
  @Field((): typeof Int => Int, {
    description: "Offset for pagination",
    defaultValue: 0,
  })
  skip: number = 0

  @Field((): typeof Int => Int, {
    description: "Records to get from current page",
    defaultValue: pagination.itemsPerPage,
  })
  take: number = pagination.itemsPerPage
}
