import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BorrowStatus } from '../../types';

@Injectable()
export class TransactionRepository {
  public model = this.prisma.transaction;

  constructor(private readonly prisma: PrismaService) {}

  async create(bookCode: string, memberCode: string) {
    const isPenalty = await this.isMemberPenalty(memberCode);
    if (isPenalty) throw new BadRequestException('Member has a penalty');

    const bookMemberCount = await this.prisma.transaction.count({
      where: { memberCode, status: BorrowStatus.BORROWED },
    });
    if (bookMemberCount >= 2)
      throw new BadRequestException('Member can only borrow 2 books');

    const isBookBorrowed = await this.prisma.transaction.findFirst({
      where: { bookCode, status: BorrowStatus.BORROWED },
    });
    if (isBookBorrowed) throw new BadRequestException('Book has been borrowed');

    return this.prisma.$transaction([
      this.model.create({
        data: {
          book: {
            connect: { code: bookCode },
          },
          member: {
            connect: { code: memberCode },
          },
        },
      }),
      this.prisma.book.update({
        where: { code: bookCode },
        data: { stock: { decrement: 1 } },
      }),
    ]);
  }

  async update(bookCode: string, memberCode: string) {
    const bookBorrowed = await this.prisma.transaction.findFirst({
      where: { bookCode, memberCode, status: BorrowStatus.BORROWED },
    });

    if (!bookBorrowed)
      throw new BadRequestException('Book has not been borrowed');

    const returnDate = new Date();
    const borrowDate = new Date(bookBorrowed.borrowDate);
    const dueDate = new Date(borrowDate.setDate(borrowDate.getDate() + 7));

    if (returnDate > dueDate) {
      await this.prisma.member.update({
        where: { code: memberCode },
        data: {
          isPenalty: true,
          endPenaltyDate: new Date(
            returnDate.setDate(returnDate.getDate() + 3),
          ),
        },
      });
    }

    return this.prisma.$transaction([
      this.model.update({
        where: { id: bookBorrowed.id },
        data: {
          returnDate,
          status: BorrowStatus.RETURNED,
        },
      }),
      this.prisma.book.update({
        where: { code: bookCode },
        data: { stock: { increment: 1 } },
      }),
    ]);
  }

  async isMemberPenalty(memberCode: string) {
    const member = await this.prisma.member.findUnique({
      where: { code: memberCode },
    });

    if (member.isPenalty) {
      const currentDate = new Date().getDate();
      const penaltyDate = new Date(member.endPenaltyDate).getDate();

      if (currentDate > penaltyDate) {
        await this.prisma.member.update({
          where: { code: memberCode },
          data: { isPenalty: false, endPenaltyDate: null },
        });

        return false;
      }
    }

    return member.isPenalty;
  }
}
