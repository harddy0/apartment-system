import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceRequestsService } from './maintenance-requests.service';
import { MaintenanceRequestsController } from './maintenance-requests.controller';
import { MaintenanceRequest } from './entities/maintenance-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceRequest])],
  controllers: [MaintenanceRequestsController],
  providers: [MaintenanceRequestsService],
  exports: [MaintenanceRequestsService],
})
export class MaintenanceRequestsModule {}
