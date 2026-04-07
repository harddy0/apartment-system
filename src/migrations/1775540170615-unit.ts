import { MigrationInterface, QueryRunner } from "typeorm";

export class Unit1775540170615 implements MigrationInterface {
    name = 'Unit1775540170615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`units\` (\`id\` int NOT NULL AUTO_INCREMENT, \`unit_number\` varchar(20) NOT NULL, \`floor\` int NOT NULL, \`bedrooms\` int NOT NULL, \`bathrooms\` int NOT NULL, \`area_sqm\` float NOT NULL, \`monthly_rent\` decimal(12,2) NOT NULL, \`security_deposit\` decimal(12,2) NOT NULL, \`status\` enum ('available', 'occupied', 'reserved', 'maintenance') NOT NULL DEFAULT 'available', \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`property_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`units\` ADD CONSTRAINT \`FK_f221e6d7bfd686266003b982b5f\` FOREIGN KEY (\`property_id\`) REFERENCES \`properties\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`units\` DROP FOREIGN KEY \`FK_f221e6d7bfd686266003b982b5f\``);
        await queryRunner.query(`DROP TABLE \`units\``);
    }

}
