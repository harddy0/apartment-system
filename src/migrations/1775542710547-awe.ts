import { MigrationInterface, QueryRunner } from "typeorm";

export class Awe1775542710547 implements MigrationInterface {
    name = 'Awe1775542710547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tenants\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tenant_code\` varchar(20) NOT NULL, \`phone_number\` varchar(20) NOT NULL, \`alternate_phone\` varchar(20) NULL, \`date_of_birth\` date NULL, \`gender\` enum ('male', 'female', 'other') NULL, \`government_id_type\` enum ('passport', 'national_id') NULL, \`government_id_number\` varchar(50) NULL, \`employment_status\` enum ('employed', 'self-employed', 'student') NULL, \`employer_name\` varchar(100) NULL, \`monthly_income\` decimal(12,2) NULL, \`emergency_contact_name\` varchar(100) NULL, \`emergency_contact_phone\` varchar(20) NULL, \`emergency_contact_relation\` varchar(50) NULL, \`move_in_date\` date NULL, \`notes\` text NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, \`created_by\` int NULL, UNIQUE INDEX \`IDX_c363668203c5dc09ce433fc7b5\` (\`tenant_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tenants\` ADD CONSTRAINT \`FK_0e2bb90ad27fa92910185792aca\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tenants\` ADD CONSTRAINT \`FK_362ad28591b5e679733c37b1151\` FOREIGN KEY (\`created_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tenants\` DROP FOREIGN KEY \`FK_362ad28591b5e679733c37b1151\``);
        await queryRunner.query(`ALTER TABLE \`tenants\` DROP FOREIGN KEY \`FK_0e2bb90ad27fa92910185792aca\``);
        await queryRunner.query(`DROP INDEX \`IDX_c363668203c5dc09ce433fc7b5\` ON \`tenants\``);
        await queryRunner.query(`DROP TABLE \`tenants\``);
    }

}
