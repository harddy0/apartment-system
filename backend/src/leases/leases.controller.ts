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
import { LeasesService } from './leases.service';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { UpdateLeaseDto } from './dto/update-lease.dto';

@ApiTags('Leases')
@Controller('leases')
export class LeasesController {
  constructor(private readonly leasesService: LeasesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a lease' })
  @ApiBody({ type: CreateLeaseDto })
  @ApiCreatedResponse({ description: 'Lease created successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed for request body.' })
  create(@Body() createLeaseDto: CreateLeaseDto) {
    return this.leasesService.create(createLeaseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all leases' })
  @ApiOkResponse({ description: 'List of leases.' })
  findAll() {
    return this.leasesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one lease by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Lease id' })
  @ApiOkResponse({ description: 'Lease details.' })
  @ApiNotFoundResponse({ description: 'Lease not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.leasesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a lease' })
  @ApiParam({ name: 'id', type: Number, description: 'Lease id' })
  @ApiBody({ type: UpdateLeaseDto })
  @ApiOkResponse({ description: 'Lease updated successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed for request body.' })
  @ApiNotFoundResponse({ description: 'Lease not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLeaseDto: UpdateLeaseDto,
  ) {
    return this.leasesService.update(id, updateLeaseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lease' })
  @ApiParam({ name: 'id', type: Number, description: 'Lease id' })
  @ApiOkResponse({ description: 'Lease deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Lease not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.leasesService.remove(id);
  }
}
