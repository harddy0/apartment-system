import {
  IsInt,
  IsString,
  IsDateString,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
  Length,
} from 'class-validator';
import { PaymentMethod, PaymentStatus } from '../entities/payment.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 'PAY-2026-0001', description: 'Unique payment code', maxLength: 20 })
  @IsString()
  @Length(1, 20)
  payment_code: string;

  @ApiProperty({ example: 1, description: 'Lease id linked to this payment' })
  @IsInt()
  lease_id: number;

  @ApiProperty({ example: 4500000, description: 'Payment amount' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ example: '2026-04-05', description: 'Payment date in YYYY-MM-DD format' })
  @IsDateString()
  payment_date: string;

  @ApiProperty({ example: '2026-04-05', description: 'Payment due date in YYYY-MM-DD format' })
  @IsDateString()
  due_date: string;

  @ApiProperty({
    enum: PaymentMethod,
    example: PaymentMethod.BANK_TRANSFER,
    description: 'Payment method used',
  })
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @ApiPropertyOptional({ example: 'TRX-998877', description: 'External payment reference number', maxLength: 50 })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  reference_number?: string;

  @ApiPropertyOptional({ enum: PaymentStatus, example: PaymentStatus.PAID, description: 'Payment status' })
  @IsEnum(PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;

  @ApiPropertyOptional({ example: 4, description: 'User id that recorded the payment' })
  @IsOptional()
  @IsInt()
  paid_by_user_id?: number;

  @ApiPropertyOptional({ example: 'Paid via mobile banking app.', description: 'Additional payment notes' })
  @IsOptional()
  @IsString()
  notes?: string;
}
