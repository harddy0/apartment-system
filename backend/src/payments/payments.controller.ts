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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a payment record' })
  @ApiBody({ type: CreatePaymentDto })
  @ApiCreatedResponse({ description: 'Payment created successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed for request body.' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  @ApiOkResponse({ description: 'List of payments.' })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one payment by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Payment id' })
  @ApiOkResponse({ description: 'Payment details.' })
  @ApiNotFoundResponse({ description: 'Payment not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a payment' })
  @ApiParam({ name: 'id', type: Number, description: 'Payment id' })
  @ApiBody({ type: UpdatePaymentDto })
  @ApiOkResponse({ description: 'Payment updated successfully.' })
  @ApiBadRequestResponse({ description: 'Validation failed for request body.' })
  @ApiNotFoundResponse({ description: 'Payment not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment' })
  @ApiParam({ name: 'id', type: Number, description: 'Payment id' })
  @ApiOkResponse({ description: 'Payment deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Payment not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.remove(id);
  }
}
