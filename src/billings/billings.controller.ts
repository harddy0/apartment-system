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
import { BillingsService } from './billings.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';

@ApiTags('Billings')
@Controller('billings')
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a billing record' })
  @ApiBody({ type: CreateBillingDto })
  @ApiCreatedResponse({ description: 'Billing record created successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed for request body.' })
  create(@Body() createBillingDto: CreateBillingDto) {
    return this.billingsService.create(createBillingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all billing records' })
  @ApiOkResponse({ description: 'List of billing records.' })
  findAll() {
    return this.billingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one billing record by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Billing id' })
  @ApiOkResponse({ description: 'Billing record details.' })
  @ApiNotFoundResponse({ description: 'Billing record not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.billingsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a billing record' })
  @ApiParam({ name: 'id', type: Number, description: 'Billing id' })
  @ApiBody({ type: UpdateBillingDto })
  @ApiOkResponse({ description: 'Billing record updated successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed for request body.' })
  @ApiNotFoundResponse({ description: 'Billing record not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBillingDto: UpdateBillingDto,
  ) {
    return this.billingsService.update(id, updateBillingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a billing record' })
  @ApiParam({ name: 'id', type: Number, description: 'Billing id' })
  @ApiOkResponse({ description: 'Billing record deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Billing record not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.billingsService.remove(id);
  }
}
