import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { BorrowStatus } from '../../types';

@Injectable()
export class MemberRepository {
  readonly logger = new Logger(MemberRepository.name);
  protected model = this.prisma.member;

  constructor(private readonly prisma: PrismaService) {}

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MemberWhereUniqueInput;
    where?: Prisma.MemberWhereInput;
    orderBy?: Prisma.MemberOrderByWithRelationInput;
  }) {
    const members = await this.model.findMany({
      include: {
        _count: {
          select: {
            borrowed: {
              where: {
                status: BorrowStatus.BORROWED,
              },
            },
          },
        },
      },
      ...params,
    });

    return members.map((member) => {
      const { _count, ...rest } = member;
      delete member._count;

      return {
        ...rest,
        countBorrowed: _count.borrowed,
      };
    });
  }

  async findOne(where: Prisma.MemberWhereUniqueInput) {
    const member = await this.model.findUnique({ where });

    if (!member) {
      throw new NotFoundException('Data not found');
    }

    return member;
  }

  async create(data: Prisma.MemberCreateInput) {
    return this.model.create({ data });
  }

  async update(params: {
    where: Prisma.MemberWhereUniqueInput;
    data: Prisma.MemberUpdateInput;
  }) {
    return this.model.update({ ...params });
  }

  async remove(where: Prisma.MemberWhereUniqueInput) {
    return this.model.delete({ where });
  }
}
