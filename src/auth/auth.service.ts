import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

import { UserRepository } from "../repositories/user.repository"
import { User } from "../users/user.entity"

import { RegisterInput } from "./types/register.input"
import { RegisterPayload } from "./types/register.payload"
import { LoginInput } from "./types/login.input"
import { LoginPayload } from "./types/login.payload"
import { AuthType } from "./types/auth.type"

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UserRepository,
  ) {}

  async me(user: User): Promise<AuthType> {
    const me = new AuthType(user)

    return me
  }

  async register(input: RegisterInput): Promise<RegisterPayload> {
    const user = await this.usersRepository.register(input)

    const auth = await this.me(user)

    const registerPayload = new RegisterPayload({
      recordId: auth.userId,
      record: auth,
    })

    return registerPayload
  }

  async login(input: LoginInput): Promise<LoginPayload> {
    const user = await this.usersRepository.login(input)

    const auth = await this.me(user)
    const loginPayload = await this.createLoginPayload(auth)

    return loginPayload
  }

  private async createLoginPayload(auth: AuthType): Promise<LoginPayload> {
    const payload = {
      login: auth.login,
      sub: auth.userId,
    }

    const token = await this.jwtService.signAsync(payload)

    return new LoginPayload({
      token,
      me: auth,
    })
  }
}
