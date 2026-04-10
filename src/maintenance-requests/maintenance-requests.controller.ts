import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { MaintenanceRequestsService } from './maintenance-requests.service';
import { CreateMaintenanceRequestDto } from './dto/create-maintenance-request.dto';
import { UpdateMaintenanceRequestDto } from './dto/update-maintenance-request.dto';
import { MaintenanceRequest } from './entities/maintenance-request.entity';

@ApiTags('Maintenance Requests')
@Controller('maintenance-requests')
export class MaintenanceRequestsController {
  constructor(
    private readonly maintenanceRequestsService: MaintenanceRequestsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a maintenance request' })
  @ApiBody({ type: CreateMaintenanceRequestDto })
  @ApiCreatedResponse({
    description: 'Maintenance request created successfully.',
    type: MaintenanceRequest,
  })
  @ApiBadRequestResponse({ description: 'Validation failed for request body.' })
  create(@Body() createMaintenanceRequestDto: CreateMaintenanceRequestDto) {
    return this.maintenanceRequestsService.create(createMaintenanceRequestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all maintenance requests' })
  @ApiOkResponse({
    description: 'List of all maintenance requests.',
    type: MaintenanceRequest,
    isArray: true,
  })
  findAll() {
    return this.maintenanceRequestsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one maintenance request by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Maintenance request id' })
  @ApiOkResponse({
    description: 'Maintenance request details.',
    type: MaintenanceRequest,
  })
  @ApiNotFoundResponse({ description: 'Maintenance request not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.maintenanceRequestsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a maintenance request' })
  @ApiParam({ name: 'id', type: Number, description: 'Maintenance request id' })
  @ApiBody({ type: UpdateMaintenanceRequestDto })
  @ApiOkResponse({
    description: 'Maintenance request updated successfully.',
    type: MaintenanceRequest,
  })
  @ApiNotFoundResponse({ description: 'Maintenance request not found.' })
  @ApiBadRequestResponse({ description: 'Validation failed for request body.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMaintenanceRequestDto: UpdateMaintenanceRequestDto,
  ) {
    return this.maintenanceRequestsService.update(
      id,
      updateMaintenanceRequestDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a maintenance request' })
  @ApiParam({ name: 'id', type: Number, description: 'Maintenance request id' })
  @ApiOkResponse({
    description: 'Maintenance request deleted successfully.',
    schema: { example: null },
  })
  @ApiNotFoundResponse({ description: 'Maintenance request not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.maintenanceRequestsService.remove(id);
  }
}
