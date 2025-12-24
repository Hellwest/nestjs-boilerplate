import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { RepositoriesModule } from "../repositories/repositories.module"

import { UsersResolver } from "./users.resolver"
import { UsersService } from "./users.service"
import { User } from "./user.entity"

@Module({
  imports: [TypeOrmModule.forFeature([User]), RepositoriesModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
