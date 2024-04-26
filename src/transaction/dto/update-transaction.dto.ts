import { PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @ApiProperty({
    required: false,
    description: 'The return date of the book',
  })
  returnDate?: Date;
}
