import { MigrationInterface, QueryRunner } from "typeorm";

export class Abang1775526490210 implements MigrationInterface {
    name = 'Abang1775526490210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_4a77d431a6b2ac981c342b13c9\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_role_assignments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`assigned_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` int NULL, \`role_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_role_assignments\` ADD CONSTRAINT \`FK_03eb0e6d5ebfdb266edecb67c7a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_role_assignments\` ADD CONSTRAINT \`FK_daf3517bf1fd13552a06b78dc91\` FOREIGN KEY (\`role_id\`) REFERENCES \`user_roles\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_role_assignments\` DROP FOREIGN KEY \`FK_daf3517bf1fd13552a06b78dc91\``);
        await queryRunner.query(`ALTER TABLE \`user_role_assignments\` DROP FOREIGN KEY \`FK_03eb0e6d5ebfdb266edecb67c7a\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`DROP TABLE \`user_role_assignments\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a77d431a6b2ac981c342b13c9\` ON \`user_roles\``);
        await queryRunner.query(`DROP TABLE \`user_roles\``);
    }

}
