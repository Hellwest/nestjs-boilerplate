import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"

import { ZodValidationPipe } from "../shared/pipes/zod-validation.pipe"

import { AuthService } from "./auth.service"
import { RegisterPayload } from "./types/register.payload"
import { RegisterInput } from "./types/register.input"
import { LoginPayload } from "./types/login.payload"
import { LoginInput } from "./types/login.input"
import { RegisterInputSchema } from "./types/register-input.schema"
import { LoginInputSchema } from "./types/login-input.schema"
import { AuthType } from "./types/auth.type"
import { GqlAuthGuard } from "./auth.guard"
import { CurrentUser } from "./user.decorator"

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((): typeof AuthType => AuthType, {
    name: "me",
    description: "Get current user info",
  })
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: AuthType): Promise<AuthType> {
    return user
  }

  @Mutation((): typeof RegisterPayload => RegisterPayload, {
    name: "register",
    description: "Register a user",
  })
  async register(
    @Args("input", new ZodValidationPipe(RegisterInputSchema))
    input: RegisterInput,
  ): Promise<RegisterPayload> {
    return await this.authService.register(input)
  }

  @Mutation((): typeof LoginPayload => LoginPayload, {
    name: "login",
    description: "Log in as a user",
  })
  async login(
    @Args("input", new ZodValidationPipe(LoginInputSchema))
    input: LoginInput,
  ): Promise<LoginPayload> {
    return await this.authService.login(input)
  }
}
