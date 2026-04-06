import { MigrationInterface, QueryRunner } from "typeorm";

export class What1775439236488 implements MigrationInterface {
    name = 'What1775439236488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`age\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`bio\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`bio\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`age\` int NOT NULL DEFAULT '18'`);
    }

}
