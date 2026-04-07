import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lease } from './entities/lease.entity';
import { Unit } from '../units/entities/unit.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { User } from '../users/entities/user.entity';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { UpdateLeaseDto } from './dto/update-lease.dto';

@Injectable()
export class LeasesService {
  constructor(
    @InjectRepository(Lease)
    private readonly leaseRepository: Repository<Lease>,
  ) {}

  async create(createLeaseDto: CreateLeaseDto): Promise<Lease> {
    const lease = this.leaseRepository.create({
      ...createLeaseDto,
      unit: { id: createLeaseDto.unit_id } as Unit,
      tenant: { id: createLeaseDto.tenant_id } as Tenant,
      created_by: createLeaseDto.created_by ? { id: createLeaseDto.created_by } as User : undefined,
    });
    return this.leaseRepository.save(lease);
  }

  async findAll(): Promise<Lease[]> {
    return this.leaseRepository.find();
  }

  async findOne(id: number): Promise<Lease> {
    const lease = await this.leaseRepository.findOne({ where: { id } });
    if (!lease) throw new NotFoundException(`Lease #${id} not found`);
    return lease;
  }

  async update(id: number, updateLeaseDto: UpdateLeaseDto): Promise<Lease> {
    const lease = await this.leaseRepository.findOne({ where: { id } });
    if (!lease) throw new NotFoundException(`Lease #${id} not found`);
    if (updateLeaseDto.unit_id)
      lease.unit = { id: updateLeaseDto.unit_id } as Unit;
    if (updateLeaseDto.tenant_id)
      lease.tenant = { id: updateLeaseDto.tenant_id } as Tenant;
    if (updateLeaseDto.created_by)
      lease.created_by = { id: updateLeaseDto.created_by } as User;
    Object.assign(lease, updateLeaseDto);
    return this.leaseRepository.save(lease);
  }

  async remove(id: number): Promise<void> {
    const result = await this.leaseRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Lease #${id} not found`);
  }
}
