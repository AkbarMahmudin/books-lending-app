import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('borrows')
@Controller('borrows')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(':bookCode')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'The request is invalid',
  })
  create(
    @Param('bookCode') bookCode: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.create(bookCode, createTransactionDto);
  }

  @Patch(':bookCode')
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
  })
  @ApiBadRequestResponse({
    description: 'The request is invalid',
  })
  update(
    @Param('bookCode') bookCode: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(bookCode, updateTransactionDto);
  }
}
