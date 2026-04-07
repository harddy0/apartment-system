import { MigrationInterface, QueryRunner } from "typeorm";

export class Aewl1775549757352 implements MigrationInterface {
    name = 'Aewl1775549757352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`leases\` (\`id\` int NOT NULL AUTO_INCREMENT, \`lease_code\` varchar(20) NOT NULL, \`start_date\` date NOT NULL, \`end_date\` date NOT NULL, \`actual_end_date\` date NULL, \`monthly_rent\` decimal(12,2) NOT NULL, \`security_deposit\` decimal(12,2) NOT NULL, \`advance_payment_amount\` decimal(12,2) NOT NULL, \`payment_due_day\` int NOT NULL, \`status\` enum ('pending', 'active', 'ended', 'terminated') NOT NULL DEFAULT 'pending', \`termination_reason\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`unit_id\` int NULL, \`tenant_id\` int NULL, \`created_by\` int NULL, UNIQUE INDEX \`IDX_79f71e2a041ec1368e5d74e349\` (\`lease_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`leases\` ADD CONSTRAINT \`FK_74490d0e8132cb49ede07d898c7\` FOREIGN KEY (\`unit_id\`) REFERENCES \`units\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`leases\` ADD CONSTRAINT \`FK_b4787e839c9c76e31d5a06aa3c5\` FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`leases\` ADD CONSTRAINT \`FK_f8e2f8ba23cd40f95f6b0dd5e6c\` FOREIGN KEY (\`created_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leases\` DROP FOREIGN KEY \`FK_f8e2f8ba23cd40f95f6b0dd5e6c\``);
        await queryRunner.query(`ALTER TABLE \`leases\` DROP FOREIGN KEY \`FK_b4787e839c9c76e31d5a06aa3c5\``);
        await queryRunner.query(`ALTER TABLE \`leases\` DROP FOREIGN KEY \`FK_74490d0e8132cb49ede07d898c7\``);
        await queryRunner.query(`DROP INDEX \`IDX_79f71e2a041ec1368e5d74e349\` ON \`leases\``);
        await queryRunner.query(`DROP TABLE \`leases\``);
    }

}
