import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMaintenanceRequestDto } from './dto/create-maintenance-request.dto';
import { UpdateMaintenanceRequestDto } from './dto/update-maintenance-request.dto';
import { MaintenanceRequest } from './entities/maintenance-request.entity';
import { Unit } from '../units/entities/unit.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MaintenanceRequestsService {
  constructor(
    @InjectRepository(MaintenanceRequest)
    private readonly maintenanceRequestRepository: Repository<MaintenanceRequest>,
  ) {}

  async create(
    createMaintenanceRequestDto: CreateMaintenanceRequestDto,
  ): Promise<MaintenanceRequest> {
    const {
      unit_id,
      tenant_id,
      assigned_to,
      reported_at,
      resolved_at,
      ...rest
    } = createMaintenanceRequestDto;

    const maintenanceRequest = this.maintenanceRequestRepository.create({
      ...rest,
      unit: { id: unit_id } as Unit,
      tenant: { id: tenant_id } as Tenant,
      assigned_to: assigned_to ? ({ id: assigned_to } as User) : undefined,
      reported_at: new Date(reported_at),
      resolved_at: resolved_at ? new Date(resolved_at) : undefined,
    });

    return this.maintenanceRequestRepository.save(maintenanceRequest);
  }

  async findAll(): Promise<MaintenanceRequest[]> {
    return this.maintenanceRequestRepository.find();
  }

  async findOne(id: number): Promise<MaintenanceRequest> {
    const maintenanceRequest =
      await this.maintenanceRequestRepository.findOneBy({ id });

    if (!maintenanceRequest) {
      throw new NotFoundException(`Maintenance request #${id} not found`);
    }

    return maintenanceRequest;
  }

  async update(
    id: number,
    updateMaintenanceRequestDto: UpdateMaintenanceRequestDto,
  ): Promise<MaintenanceRequest> {
    const maintenanceRequest = await this.findOne(id);
    const {
      unit_id,
      tenant_id,
      assigned_to,
      reported_at,
      resolved_at,
      ...rest
    } = updateMaintenanceRequestDto;

    if (unit_id !== undefined) {
      maintenanceRequest.unit = { id: unit_id } as Unit;
    }

    if (tenant_id !== undefined) {
      maintenanceRequest.tenant = { id: tenant_id } as Tenant;
    }

    if (assigned_to !== undefined) {
      maintenanceRequest.assigned_to = assigned_to
        ? ({ id: assigned_to } as User)
        : undefined;
    }

    if (reported_at !== undefined) {
      maintenanceRequest.reported_at = new Date(reported_at);
    }

    if (resolved_at !== undefined) {
      maintenanceRequest.resolved_at = resolved_at
        ? new Date(resolved_at)
        : undefined;
    }

    Object.assign(maintenanceRequest, rest);

    return this.maintenanceRequestRepository.save(maintenanceRequest);
  }

  async remove(id: number): Promise<void> {
    const result = await this.maintenanceRequestRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Maintenance request #${id} not found`);
    }
  }
}
