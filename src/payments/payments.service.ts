import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Lease } from '../leases/entities/lease.entity';
import { User } from '../users/entities/user.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create({
      ...createPaymentDto,
      lease: { id: createPaymentDto.lease_id } as Lease,
      paid_by_user: createPaymentDto.paid_by_user_id
        ? ({ id: createPaymentDto.paid_by_user_id } as User)
        : undefined,
    });
    return this.paymentRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) throw new NotFoundException(`Payment #${id} not found`);
    return payment;
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) throw new NotFoundException(`Payment #${id} not found`);
    if (updatePaymentDto.lease_id)
      payment.lease = { id: updatePaymentDto.lease_id } as Lease;
    if (updatePaymentDto.paid_by_user_id)
      payment.paid_by_user = { id: updatePaymentDto.paid_by_user_id } as User;
    Object.assign(payment, updatePaymentDto);
    return this.paymentRepository.save(payment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.paymentRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Payment #${id} not found`);
  }
}
