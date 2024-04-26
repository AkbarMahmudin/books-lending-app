import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MemberRepository } from './repositories/member.repository';

@Module({
  imports: [PrismaModule],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
})
export class MemberModule {}
