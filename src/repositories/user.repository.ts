import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { DataSource } from "typeorm"
import * as bcrypt from "bcryptjs"

import { User } from "../users/user.entity"
import { PaginationRepository } from "../shared/pagination/pagination"
import { RegisterInput } from "../auth/types/register.input"
import { LoginInput } from "../auth/types/login.input"

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

  async register(input: RegisterInput): Promise<User | never> {
    const { login, password } = input

    const existingUser = await this.getAlreadyCreatedUser(login)

    if (existingUser) {
      throw new ConflictException("api.userAlreadyExists")
    }

    const user = this.create()
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    Object.assign(user, {
      login,
      password: hashedPassword,
      salt,
    })

    console.log("Saving")
    return await user.save()
  }

  async login(input: LoginInput): Promise<User | never> {
    const { login, password } = input

    const user = await this.getAlreadyCreatedUser(login)

    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException("api.invalidCredentials")
    }

    return user
  }

  private async getAlreadyCreatedUser(login: string): Promise<User | null> {
    return await this.findOne({
      where: {
        login,
      },
    })
  }
}
