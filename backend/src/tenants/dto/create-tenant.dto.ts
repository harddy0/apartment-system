import {
  IsInt,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Gender,
  GovernmentIdType,
  EmploymentStatus,
} from '../entities/tenant.entity';

export class CreateTenantDto {
  @ApiProperty({ example: 'TEN-2026-0001', description: 'Unique tenant code' })
  @IsString()
  tenant_code: string;

  @ApiProperty({ example: '+6281234567890', description: 'Primary phone number' })
  @IsString()
  phone_number: string;

  @ApiPropertyOptional({ example: '+6289876543210', description: 'Alternate phone number' })
  @IsOptional()
  @IsString()
  alternate_phone?: string;

  @ApiPropertyOptional({ example: '1995-05-15', description: 'Date of birth in YYYY-MM-DD format' })
  @IsOptional()
  @IsDateString()
  date_of_birth?: string;

  @ApiPropertyOptional({ enum: Gender, example: Gender.MALE, description: 'Gender' })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional({
    enum: GovernmentIdType,
    example: GovernmentIdType.NATIONAL_ID,
    description: 'Government ID type',
  })
  @IsOptional()
  @IsEnum(GovernmentIdType)
  government_id_type?: GovernmentIdType;

  @ApiPropertyOptional({ example: '3276010101990001', description: 'Government ID number' })
  @IsOptional()
  @IsString()
  government_id_number?: string;

  @ApiPropertyOptional({
    enum: EmploymentStatus,
    example: EmploymentStatus.EMPLOYED,
    description: 'Employment status',
  })
  @IsOptional()
  @IsEnum(EmploymentStatus)
  employment_status?: EmploymentStatus;

  @ApiPropertyOptional({ example: 'PT Contoso Indonesia', description: 'Employer name' })
  @IsOptional()
  @IsString()
  employer_name?: string;

  @ApiPropertyOptional({ example: 12000000, description: 'Monthly income amount' })
  @IsOptional()
  @IsNumber()
  monthly_income?: number;

  @ApiPropertyOptional({ example: 'Budi Santoso', description: 'Emergency contact name' })
  @IsOptional()
  @IsString()
  emergency_contact_name?: string;

  @ApiPropertyOptional({ example: '+6281122233344', description: 'Emergency contact phone number' })
  @IsOptional()
  @IsString()
  emergency_contact_phone?: string;

  @ApiPropertyOptional({ example: 'Brother', description: 'Relationship to emergency contact' })
  @IsOptional()
  @IsString()
  emergency_contact_relation?: string;

  @ApiPropertyOptional({ example: '2026-04-01', description: 'Move-in date in YYYY-MM-DD format' })
  @IsOptional()
  @IsDateString()
  move_in_date?: string;

  @ApiPropertyOptional({ example: 'Prefers communication via WhatsApp.', description: 'Additional notes' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ example: 1, description: 'User id who created this tenant record' })
  @IsOptional()
  @IsInt()
  created_by?: number;
}
