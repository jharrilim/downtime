import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1558193281559 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "topic" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" integer, "categoryId" integer, CONSTRAINT "UQ_15f634a2dbf62a79bb726fc6158" UNIQUE ("name"), CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "title" character varying NOT NULL, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "topicId" integer, "authorId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "dateJoined" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" integer, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topic_admins_user" ("topicId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_9f739393b6493213966cdbc8dc5" PRIMARY KEY ("topicId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2ae0e9be9b9e8dcb0d05b70605" ON "topic_admins_user" ("topicId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0f18755c2052c448c3d0ae98f6" ON "topic_admins_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "user_roles_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_e75717e229192de9dfb7d3de35d" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_f8bf220112570b5c2be647f0942" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_96496a94cfa49a06d6d802c0dea" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_030a9e2ed176dfa1ab471de612f" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic_admins_user" ADD CONSTRAINT "FK_2ae0e9be9b9e8dcb0d05b70605e" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic_admins_user" ADD CONSTRAINT "FK_0f18755c2052c448c3d0ae98f67" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`);
        await queryRunner.query(`ALTER TABLE "topic_admins_user" DROP CONSTRAINT "FK_0f18755c2052c448c3d0ae98f67"`);
        await queryRunner.query(`ALTER TABLE "topic_admins_user" DROP CONSTRAINT "FK_2ae0e9be9b9e8dcb0d05b70605e"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_030a9e2ed176dfa1ab471de612f"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_96496a94cfa49a06d6d802c0dea"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_f8bf220112570b5c2be647f0942"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_e75717e229192de9dfb7d3de35d"`);
        await queryRunner.query(`DROP INDEX "IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`DROP INDEX "IDX_5f9286e6c25594c6b88c108db7"`);
        await queryRunner.query(`DROP TABLE "user_roles_role"`);
        await queryRunner.query(`DROP INDEX "IDX_0f18755c2052c448c3d0ae98f6"`);
        await queryRunner.query(`DROP INDEX "IDX_2ae0e9be9b9e8dcb0d05b70605"`);
        await queryRunner.query(`DROP TABLE "topic_admins_user"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "topic"`);
    }

}
