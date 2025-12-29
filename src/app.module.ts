import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { GraphQLModule } from "@nestjs/graphql"

import { UsersModule } from "./users/users.module"
import { SharedModule } from "./shared/shared.module"
import { RepositoriesModule } from "./repositories/repositories.module"
import { dbConfig, graphqlConfig } from "./config"
import { AuthModule } from "./auth/auth.module"

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    GraphQLModule.forRoot(graphqlConfig),
    RepositoriesModule,
    SharedModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
