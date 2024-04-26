import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private logger = new Logger(PrismaService.name);

  constructor() {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('Prisma connected');
  }

  onModuleDestroy() {
    this.$disconnect();
    this.logger.log('Prisma disconnected');
  }
}
