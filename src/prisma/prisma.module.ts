import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { APP_FILTER } from '@nestjs/core';
import { PrismaFilter } from './prisma.filter';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: PrismaFilter,
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
