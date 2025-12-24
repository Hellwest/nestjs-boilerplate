import { MigrationInterface, QueryRunner } from "typeorm"

export class AddUsersTable1766488295333 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
        "login" VARCHAR NOT NULL,
        "password" VARCHAR NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        "deleted_at" TIMESTAMP DEFAULT NULL
      );
    `)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "users";
    `)
  }
}
