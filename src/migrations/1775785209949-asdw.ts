import { MigrationInterface, QueryRunner } from "typeorm";

export class Asdw1775785209949 implements MigrationInterface {
    name = 'Asdw1775785209949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`billings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`billing_period_start\` date NOT NULL, \`billing_period_end\` date NOT NULL, \`amount_due\` decimal(12,2) NOT NULL, \`due_date\` date NOT NULL, \`status\` enum ('unpaid', 'partially_paid', 'paid', 'overdue') NOT NULL DEFAULT 'unpaid', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lease_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`billings\` ADD CONSTRAINT \`FK_3e7fe4066d1b9f61e23d95a9c44\` FOREIGN KEY (\`lease_id\`) REFERENCES \`leases\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`billings\` DROP FOREIGN KEY \`FK_3e7fe4066d1b9f61e23d95a9c44\``);
        await queryRunner.query(`DROP TABLE \`billings\``);
    }

}
