import { MigrationInterface, QueryRunner } from "typeorm"

import {
  USERS_PRIMARY_KEY_CONSTRAINT,
  USERS_UNIQUE_LOGIN_CONSTRAINT,
} from "../shared/constants/database"

export class AddUsersTable1766488295333 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "login" VARCHAR NOT NULL,
        "password" VARCHAR NOT NULL,
        "salt" VARCHAR NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        "deleted_at" TIMESTAMP DEFAULT NULL,

        CONSTRAINT ${USERS_PRIMARY_KEY_CONSTRAINT} PRIMARY KEY ("id"),
        CONSTRAINT ${USERS_UNIQUE_LOGIN_CONSTRAINT} UNIQUE ("login")
      );
    `)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "users";
    `)
  }
}
