import { ObjectLiteral, Repository } from "typeorm"

import { PaginationInfo } from "../types/pagination-info.type"

export class PaginationRepository<
  T extends ObjectLiteral,
> extends Repository<T> {
  getPaginationInfo(skip: number, take: number, total: number): PaginationInfo {
    const pageInfo = new PaginationInfo()

    pageInfo.perPage = take || total || 1
    pageInfo.page = Math.floor(skip / pageInfo.perPage) + 1
    pageInfo.totalItems = total
    pageInfo.totalPages = Math.floor(
      (total + pageInfo.perPage - 1) / pageInfo.perPage,
    )
    pageInfo.hasNextPage = pageInfo.page < pageInfo.totalPages
    pageInfo.hasPreviousPage = pageInfo.page > 1

    return pageInfo
  }
}
