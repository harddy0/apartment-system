import {
  IsInt,
  IsString,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { UnitStatus } from '../entities/unit.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitDto {
  @ApiProperty({ example: 1, description: 'Property id this unit belongs to' })
  @IsInt()
  property_id: number;

  @ApiProperty({ example: 'A-101', description: 'Unit number', maxLength: 20 })
  @IsString()
  @IsNotEmpty()
  unit_number: string;

  @ApiProperty({ example: 10, description: 'Floor number' })
  @IsInt()
  floor: number;

  @ApiProperty({ example: 2, description: 'Number of bedrooms' })
  @IsInt()
  bedrooms: number;

  @ApiProperty({ example: 1, description: 'Number of bathrooms' })
  @IsInt()
  bathrooms: number;

  @ApiProperty({ example: 48.5, description: 'Unit area in square meters' })
  @IsNumber()
  area_sqm: number;

  @ApiProperty({ example: 4500000, description: 'Monthly rental amount' })
  @IsNumber()
  monthly_rent: number;

  @ApiProperty({ example: 4500000, description: 'Security deposit amount' })
  @IsNumber()
  security_deposit: number;

  @ApiProperty({ enum: UnitStatus, example: UnitStatus.AVAILABLE, description: 'Current unit status' })
  @IsEnum(UnitStatus)
  status: UnitStatus;

  @ApiProperty({ example: true, description: 'Whether the unit is active' })
  @IsBoolean()
  is_active: boolean;
}
