import { MigrationInterface, QueryRunner } from "typeorm";

export class Kwarto1775529579366 implements MigrationInterface {
    name = 'Kwarto1775529579366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`properties\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(50) NOT NULL, \`address_line\` varchar(255) NOT NULL, \`city\` varchar(100) NOT NULL, \`province\` varchar(100) NOT NULL, \`postal_code\` varchar(20) NOT NULL, \`country\` varchar(100) NOT NULL, \`total_units\` int NULL, \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_220d2c2f64cf6d6eeb6816b84a\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_220d2c2f64cf6d6eeb6816b84a\` ON \`properties\``);
        await queryRunner.query(`DROP TABLE \`properties\``);
    }

}
