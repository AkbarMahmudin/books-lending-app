import { ApiProperty } from '@nestjs/swagger';
import { BorrowStatus } from '../../types';

export class CreateTransactionDto {
  @ApiProperty()
  memberCode: string;

  @ApiProperty()
  bookCode: string;

  @ApiProperty({
    description: 'The date the book is borrowed',
  })
  borrowDate: Date;

  @ApiProperty({ enum: BorrowStatus, default: BorrowStatus.BORROWED })
  status: BorrowStatus;
}
