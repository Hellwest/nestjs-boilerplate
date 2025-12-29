import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"

import { RepositoriesModule } from "../repositories/repositories.module"
import { jwtConfig } from "../config"

import { AuthService } from "./auth.service"
import { AuthResolver } from "./auth.resolver"
import { JwtStrategy } from "./jwt.strategy"

@Module({
  imports: [
    RepositoriesModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      global: true,
      secret: jwtConfig.secret,
      signOptions: { expiresIn: "30d" },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
