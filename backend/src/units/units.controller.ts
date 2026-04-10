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
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@ApiTags('Units')
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a unit' })
  @ApiBody({ type: CreateUnitDto })
  @ApiCreatedResponse({ description: 'Unit created successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed for request body.' })
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitsService.create(createUnitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated units' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOkResponse({ description: 'Paginated units list.' })
  findAll(@nestjsPaginate.Paginate() query: nestjsPaginate.PaginateQuery) {
    return this.unitsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one unit by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Unit id' })
  @ApiOkResponse({ description: 'Unit details.' })
  @ApiNotFoundResponse({ description: 'Unit not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.unitsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a unit' })
  @ApiParam({ name: 'id', type: Number, description: 'Unit id' })
  @ApiBody({ type: UpdateUnitDto })
  @ApiOkResponse({ description: 'Unit updated successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed for request body.' })
  @ApiNotFoundResponse({ description: 'Unit not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUnitDto: UpdateUnitDto,
  ) {
    return this.unitsService.update(id, updateUnitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a unit' })
  @ApiParam({ name: 'id', type: Number, description: 'Unit id' })
  @ApiOkResponse({ description: 'Unit deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Unit not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.unitsService.remove(id);
  }
}
