import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePropertyDto {
  @ApiProperty({ example: 'Sunset Apartments', description: 'Property name' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'PROP-001', description: 'Unique property code' })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ example: '123 Main Street', description: 'Street address' })
  @IsString()
  @IsNotEmpty()
  address_line!: string;

  @ApiProperty({ example: 'Jakarta', description: 'City name' })
  @IsString()
  @IsNotEmpty()
  city!: string;

  @ApiProperty({ example: 'DKI Jakarta', description: 'Province or state' })
  @IsString()
  @IsNotEmpty()
  province!: string;

  @ApiProperty({ example: '10220', description: 'Postal code' })
  @IsString()
  @IsNotEmpty()
  postal_code!: string;

  @ApiProperty({ example: 'Indonesia', description: 'Country name' })
  @IsString()
  @IsNotEmpty()
  country!: string;

  @ApiPropertyOptional({ example: 120, description: 'Total unit count in this property' })
  @IsOptional()
  @IsInt()
  total_units?: number;

  @ApiPropertyOptional({
    enum: ['active', 'inactive'],
    example: 'active',
    description: 'Operational status of the property',
  })
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
