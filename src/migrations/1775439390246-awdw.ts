import { MigrationInterface, QueryRunner } from "typeorm";

export class Awdw1775439390246 implements MigrationInterface {
    name = 'Awdw1775439390246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`age\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`bio\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`bio\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`age\` int NOT NULL DEFAULT '18'`);
    }

}
