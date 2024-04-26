import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BookRepository {
  readonly logger = new Logger(BookRepository.name);
  protected model = this.prisma.book;

  constructor(private readonly prisma: PrismaService) {}

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookWhereUniqueInput;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput;
  }) {
    return this.model.findMany(params);
  }

  async findOne(where: Prisma.BookWhereUniqueInput) {
    const book = await this.model.findUnique({ where });

    if (!book) {
      throw new NotFoundException('Data not found');
    }

    return book;
  }

  async create(data: Prisma.BookCreateInput) {
    return this.model.create({ data });
  }

  async update(params: {
    where: Prisma.BookWhereUniqueInput;
    data: Prisma.BookUpdateInput;
  }) {
    return this.model.update({ ...params });
  }

  async remove(where: Prisma.BookWhereUniqueInput) {
    return this.model.delete({ where });
  }
}
