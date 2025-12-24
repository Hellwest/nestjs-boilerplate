// a file for typeorm cli scripts from package.json

import "reflect-metadata"
import "dotenv/config"

import { DataSource } from "typeorm"

import { dbConfig } from "./db.config"

export const ormConfig = new DataSource({
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: dbConfig.entities,
  migrations: dbConfig.migrations,
  migrationsRun: dbConfig.migrationsRun,
  migrationsTransactionMode: dbConfig.migrationsTransactionMode,
  synchronize: dbConfig.synchronize,
})
