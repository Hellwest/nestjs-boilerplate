import { Injectable } from "@nestjs/common"
import { DataSource } from "typeorm"

import { User } from "../users/user.entity"
import { PaginationRepository } from "../shared/pagination/pagination"

@Injectable()
export class UserRepository extends PaginationRepository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }

  async test(): Promise<void> {
    const result = await this.query(`SELECT 1 AS "test"`)
    console.log(result[0].test)

    return result[0].test
  }
}
