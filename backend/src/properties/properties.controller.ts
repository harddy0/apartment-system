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
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@ApiTags('Properties')
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a property' })
  @ApiBody({ type: CreatePropertyDto })
  @ApiCreatedResponse({ description: 'Property created successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed for request body.' })
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated properties' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOkResponse({ description: 'Paginated properties list.' })
  findAll(@nestjsPaginate.Paginate() query: nestjsPaginate.PaginateQuery) {
    return this.propertiesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one property by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Property id' })
  @ApiOkResponse({ description: 'Property details.' })
  @ApiNotFoundResponse({ description: 'Property not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.propertiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a property' })
  @ApiParam({ name: 'id', type: Number, description: 'Property id' })
  @ApiBody({ type: UpdatePropertyDto })
  @ApiOkResponse({ description: 'Property updated successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed for request body.' })
  @ApiNotFoundResponse({ description: 'Property not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a property' })
  @ApiParam({ name: 'id', type: Number, description: 'Property id' })
  @ApiOkResponse({ description: 'Property deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Property not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.propertiesService.remove(id);
  }
}
