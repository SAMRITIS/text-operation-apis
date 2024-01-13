import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskTable1705133786006 implements MigrationInterface {
    name = 'CreateTaskTable1705133786006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_name_enum" AS ENUM('count-word', 'count-unique-word', 'top-k-word')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" "public"."task_name_enum" NOT NULL, "uuid" character varying NOT NULL, "k_word" integer, "result" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_name_enum"`);
    }

}
