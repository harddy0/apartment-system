import { MigrationInterface, QueryRunner } from "typeorm";

export class Yawa1775781022505 implements MigrationInterface {
    name = 'Yawa1775781022505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`maintenance_requests\` (\`id\` int NOT NULL AUTO_INCREMENT, \`request_code\` varchar(20) NOT NULL, \`title\` varchar(100) NOT NULL, \`description\` text NOT NULL, \`priority\` enum ('low', 'medium', 'high') NOT NULL, \`status\` enum ('open', 'assigned', 'in_progress', 'resolved', 'closed') NOT NULL DEFAULT 'open', \`reported_at\` timestamp NOT NULL, \`resolved_at\` timestamp NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`unit_id\` int NULL, \`tenant_id\` int NULL, \`assigned_to\` int NULL, UNIQUE INDEX \`IDX_a6412a20f56f4675ba20e8ef5f\` (\`request_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`maintenance_requests\` ADD CONSTRAINT \`FK_5bc3ad3c2007fa9e7f3fe1ee3cb\` FOREIGN KEY (\`unit_id\`) REFERENCES \`units\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`maintenance_requests\` ADD CONSTRAINT \`FK_42bdf962a8e2790aaed83797574\` FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`maintenance_requests\` ADD CONSTRAINT \`FK_67db6938855eb05bddf4536eee4\` FOREIGN KEY (\`assigned_to\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`maintenance_requests\` DROP FOREIGN KEY \`FK_67db6938855eb05bddf4536eee4\``);
        await queryRunner.query(`ALTER TABLE \`maintenance_requests\` DROP FOREIGN KEY \`FK_42bdf962a8e2790aaed83797574\``);
        await queryRunner.query(`ALTER TABLE \`maintenance_requests\` DROP FOREIGN KEY \`FK_5bc3ad3c2007fa9e7f3fe1ee3cb\``);
        await queryRunner.query(`DROP INDEX \`IDX_a6412a20f56f4675ba20e8ef5f\` ON \`maintenance_requests\``);
        await queryRunner.query(`DROP TABLE \`maintenance_requests\``);
    }

}
