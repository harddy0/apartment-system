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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import * as nestjsPaginate from 'nestjs-paginate';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a tenant' })
  @ApiBody({ type: CreateTenantDto })
  @ApiCreatedResponse({ description: 'Tenant created successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed for request body.' })
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantsService.create(createTenantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated tenants' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOkResponse({ description: 'Paginated tenants list.' })
  findAll(@nestjsPaginate.Paginate() query: nestjsPaginate.PaginateQuery) {
    return this.tenantsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one tenant by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Tenant id' })
  @ApiOkResponse({ description: 'Tenant details.' })
  @ApiNotFoundResponse({ description: 'Tenant not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tenantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tenant' })
  @ApiParam({ name: 'id', type: Number, description: 'Tenant id' })
  @ApiBody({ type: UpdateTenantDto })
  @ApiOkResponse({ description: 'Tenant updated successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed for request body.' })
  @ApiNotFoundResponse({ description: 'Tenant not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTenantDto: UpdateTenantDto,
  ) {
    return this.tenantsService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tenant' })
  @ApiParam({ name: 'id', type: Number, description: 'Tenant id' })
  @ApiOkResponse({ description: 'Tenant deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Tenant not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tenantsService.remove(id);
  }
}
