import { MigrationInterface, QueryRunner } from "typeorm";

export class Payments1775551837365 implements MigrationInterface {
    name = 'Payments1775551837365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`payments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`payment_code\` varchar(20) NOT NULL, \`amount\` decimal(12,2) NOT NULL, \`payment_date\` date NOT NULL, \`due_date\` date NOT NULL, \`payment_method\` enum ('cash', 'bank_transfer', 'gcash') NOT NULL, \`reference_number\` varchar(50) NULL, \`status\` enum ('pending', 'paid', 'failed', 'overdue') NOT NULL DEFAULT 'pending', \`notes\` text NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lease_id\` int NULL, \`paid_by_user_id\` int NULL, UNIQUE INDEX \`IDX_353a536e71fcc8cbea01ae3926\` (\`payment_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_72fae2ace901fdd43c82702c860\` FOREIGN KEY (\`lease_id\`) REFERENCES \`leases\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_d93becae007d3880b7fc0ba1d76\` FOREIGN KEY (\`paid_by_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_d93becae007d3880b7fc0ba1d76\``);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_72fae2ace901fdd43c82702c860\``);
        await queryRunner.query(`DROP INDEX \`IDX_353a536e71fcc8cbea01ae3926\` ON \`payments\``);
        await queryRunner.query(`DROP TABLE \`payments\``);
    }

}
