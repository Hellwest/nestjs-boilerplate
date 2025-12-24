import { MigrationInterface, QueryRunner } from "typeorm"

export class AddUUIDExtension1766488295330 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP EXTENSION IF EXISTS "uuid-ossp";
    `)
  }
}
