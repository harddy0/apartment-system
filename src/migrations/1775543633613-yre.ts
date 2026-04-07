import { MigrationInterface, QueryRunner } from "typeorm";

export class Yre1775543633613 implements MigrationInterface {
    name = 'Yre1775543633613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tenants\` DROP FOREIGN KEY \`FK_0e2bb90ad27fa92910185792aca\``);
        await queryRunner.query(`ALTER TABLE \`tenants\` DROP COLUMN \`user_id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tenants\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tenants\` ADD CONSTRAINT \`FK_0e2bb90ad27fa92910185792aca\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
