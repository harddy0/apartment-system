import {
	IsInt,
	IsString,
	IsEnum,
	IsOptional,
	IsDateString,
	Length,
} from 'class-validator';
import { MaintenancePriority, MaintenanceStatus } from '../entities/maintenance-request.entity';

export class CreateMaintenanceRequestDto {
	@IsString()
	@Length(1, 20)
	request_code: string;

	@IsInt()
	unit_id: number;

	@IsInt()
	tenant_id: number;

	@IsString()
	@Length(1, 100)
	title: string;

	@IsString()
	description: string;

	@IsEnum(MaintenancePriority)
	priority: MaintenancePriority;

	@IsEnum(MaintenanceStatus)
	@IsOptional()
	status?: MaintenanceStatus;

	@IsOptional()
	@IsInt()
	assigned_to?: number;

	@IsDateString()
	reported_at: string;

	@IsOptional()
	@IsDateString()
	resolved_at?: string;
}
