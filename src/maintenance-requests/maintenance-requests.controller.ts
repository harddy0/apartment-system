import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaintenanceRequestsService } from './maintenance-requests.service';
import { CreateMaintenanceRequestDto } from './dto/create-maintenance-request.dto';
import { UpdateMaintenanceRequestDto } from './dto/update-maintenance-request.dto';

@Controller('maintenance-requests')
export class MaintenanceRequestsController {
  constructor(
    private readonly maintenanceRequestsService: MaintenanceRequestsService,
  ) {}

  @Post()
  create(@Body() createMaintenanceRequestDto: CreateMaintenanceRequestDto) {
    return this.maintenanceRequestsService.create(createMaintenanceRequestDto);
  }

  @Get()
  findAll() {
    return this.maintenanceRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maintenanceRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaintenanceRequestDto: UpdateMaintenanceRequestDto,
  ) {
    return this.maintenanceRequestsService.update(
      +id,
      updateMaintenanceRequestDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maintenanceRequestsService.remove(+id);
  }
}
