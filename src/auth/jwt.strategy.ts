import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { InjectRepository } from "@nestjs/typeorm"
import { Strategy, ExtractJwt } from "passport-jwt"

import { jwtConfig } from "../config"
import { UserRepository } from "../repositories/user.repository"

import { JwtPayload } from "./types/jwt-payload.interface"
import { AuthType } from "./types/auth.type"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    })
  }

  async validate(payload: JwtPayload): Promise<AuthType> {
    const { sub } = payload

    const user = await this.userRepository.findOne({
      where: {
        id: sub,
      },
    })

    if (!user) {
      throw new UnauthorizedException()
    }

    return new AuthType(user)
  }
}
