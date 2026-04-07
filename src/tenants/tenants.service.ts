import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  create(createTenantDto: CreateTenantDto) {
    const tenant = this.tenantRepository.create({
      ...createTenantDto,
      created_by: createTenantDto.created_by ? { id: createTenantDto.created_by } : undefined,
    });
    return this.tenantRepository.save(tenant);
  }

  findAll(query: PaginateQuery) {
    return paginate(query, this.tenantRepository, {
      sortableColumns: ['id', 'tenant_code', 'created_at', 'updated_at'],
      searchableColumns: ['tenant_code', 'phone_number', 'government_id_number', 'employer_name', 'emergency_contact_name'],
      filterableColumns: {
        gender: true,
        employment_status: true,
        government_id_type: true,
        user_id: true,
        created_by: true,
      },
      defaultSortBy: [['created_at', 'DESC']],
      defaultLimit: 10,
      maxLimit: 50,
      relations: ['user', 'created_by'],
    });
  }

  async findOne(id: number) {
    const tenant = await this.tenantRepository.findOne({ where: { id }, relations: ['user', 'created_by'] });
    if (!tenant) throw new NotFoundException(`Tenant #${id} not found`);
    return tenant;
  }

  async update(id: number, updateTenantDto: UpdateTenantDto) {
    const tenant = await this.tenantRepository.preload({
      id,
      ...updateTenantDto,
      created_by: updateTenantDto.created_by
        ? { id: updateTenantDto.created_by }
        : undefined,
    });
    if (!tenant) throw new NotFoundException(`Tenant #${id} not found`);
    return this.tenantRepository.save(tenant);
  }

  async remove(id: number) {
    const tenant = await this.findOne(id);
    return this.tenantRepository.remove(tenant);
  }
}
