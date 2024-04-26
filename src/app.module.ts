import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { MemberModule } from './member/member.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [BookModule, MemberModule, TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
