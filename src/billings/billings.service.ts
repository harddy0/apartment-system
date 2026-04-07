import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Billing } from './entities/billing.entity';
import { Lease } from '../leases/entities/lease.entity';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';

@Injectable()
export class BillingsService {
  constructor(
    @InjectRepository(Billing)
    private readonly billingRepository: Repository<Billing>,
  ) {}

  async create(createBillingDto: CreateBillingDto): Promise<Billing> {
    const billing = this.billingRepository.create({
      ...createBillingDto,
      lease: { id: createBillingDto.lease_id } as Lease,
    });
    return this.billingRepository.save(billing);
  }

  async findAll(): Promise<Billing[]> {
    return this.billingRepository.find();
  }

  async findOne(id: number): Promise<Billing> {
    const billing = await this.billingRepository.findOne({ where: { id } });
    if (!billing) throw new NotFoundException(`Billing #${id} not found`);
    return billing;
  }

  async update(id: number, updateBillingDto: UpdateBillingDto): Promise<Billing> {
    const billing = await this.billingRepository.findOne({ where: { id } });
    if (!billing) throw new NotFoundException(`Billing #${id} not found`);
    if (updateBillingDto.lease_id) billing.lease = { id: updateBillingDto.lease_id } as Lease;
    Object.assign(billing, updateBillingDto);
    return this.billingRepository.save(billing);
  }

  async remove(id: number): Promise<void> {
    const result = await this.billingRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Billing #${id} not found`);
  }
}
