import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterFileAndTaskTableRelationAdded1705133825215 implements MigrationInterface {
    name = 'AlterFileAndTaskTableRelationAdded1705133825215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "file_id" integer`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_782d932882f6dd1194d5017486f" FOREIGN KEY ("file_id") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_782d932882f6dd1194d5017486f"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "file_id"`);
    }

}
