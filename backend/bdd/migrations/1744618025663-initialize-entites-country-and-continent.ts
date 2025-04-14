import { MigrationInterface, QueryRunner } from "typeorm";

export class InitializeEntitesCountryAndContinent1744618025663 implements MigrationInterface {
    name = 'InitializeEntitesCountryAndContinent1744618025663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "continent" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "country" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "code" varchar NOT NULL, "emoji" varchar NOT NULL, "continentId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_country" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "code" varchar NOT NULL, "emoji" varchar NOT NULL, "continentId" integer, CONSTRAINT "FK_739794b0633d66ca3c88452855f" FOREIGN KEY ("continentId") REFERENCES "continent" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_country"("id", "name", "code", "emoji", "continentId") SELECT "id", "name", "code", "emoji", "continentId" FROM "country"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`ALTER TABLE "temporary_country" RENAME TO "country"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" RENAME TO "temporary_country"`);
        await queryRunner.query(`CREATE TABLE "country" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "code" varchar NOT NULL, "emoji" varchar NOT NULL, "continentId" integer)`);
        await queryRunner.query(`INSERT INTO "country"("id", "name", "code", "emoji", "continentId") SELECT "id", "name", "code", "emoji", "continentId" FROM "temporary_country"`);
        await queryRunner.query(`DROP TABLE "temporary_country"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TABLE "continent"`);
    }

}
