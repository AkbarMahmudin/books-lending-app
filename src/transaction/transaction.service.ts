import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './repositories/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async create(bookCode: string, { memberCode }: CreateTransactionDto) {
    await this.transactionRepository.create(bookCode, memberCode);
    return { message: 'Book borrowed' };
  }

  async update(bookCode: string, { memberCode }: UpdateTransactionDto) {
    await this.transactionRepository.update(bookCode, memberCode);
    return { message: 'Book returned' };
  }
}
