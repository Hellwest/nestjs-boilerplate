import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js"

export const dbConfig: TypeOrmModuleOptions & PostgresConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "nestjs-boilerplate",
  password: process.env.DB_PASSWORD || "nestjs-boilerplate",
  database: process.env.DB_NAME || "nestjs-boilerplate",
  migrations: ["dist/migrations/*.js"],
  migrationsTransactionMode: "each",
  migrationsRun: process.env.DB_MIGRATIONS_RUN === "true",
  logging: true,
  autoLoadEntities: true,
  synchronize: false,
}
