import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('borrows')
@Controller('borrows')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(':bookCode')
  create(
    @Param('bookCode') bookCode: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.create(bookCode, createTransactionDto);
  }

  @Patch(':bookCode')
  update(
    @Param('bookCode') bookCode: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(bookCode, updateTransactionDto);
  }
}
