import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionRepository } from './repositories/transaction.repository';
import { PrismaService } from '../prisma/prisma.service';

const mockBooks = [
  {
    code: 'JK-45',
    title: 'Harry Potter',
    author: 'J.K Rowling',
    stock: 1,
  },
  {
    code: 'SHR-1',
    title: 'A Study in Scarlet',
    author: 'Arthur Conan Doyle',
    stock: 1,
  },
  {
    code: 'TW-11',
    title: 'Twilight',
    author: 'Stephenie Meyer',
    stock: 1,
  },
  {
    code: 'HOB-83',
    title: 'The Hobbit, or There and Back Again',
    author: 'J.R.R. Tolkien',
    stock: 1,
  },
  {
    code: 'NRN-7',
    title: 'The Lion, the Witch and the Wardrobe',
    author: 'C.S. Lewis',
    stock: 1,
  },
];
const mockMembers = [
  {
    code: 'M001',
    name: 'Angga',
  },
  {
    code: 'M002',
    name: 'Ferry',
  },
  {
    code: 'M003',
    name: 'Putri',
    isPenalty: true,
    endPenaltyDate: new Date(new Date().setDate(new Date().getDate() + 3)),
  },
];

jest.useFakeTimers();
jest.setTimeout(30000);

describe('TransactionController', () => {
  let controller: TransactionController;
  let prisma: PrismaService;
  let repository: TransactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [TransactionController],
      providers: [TransactionService, TransactionRepository],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    prisma = module.get<PrismaService>(PrismaService);
    repository = module.get<TransactionRepository>(TransactionRepository);

    await prisma.$transaction([
      prisma.book.createMany({ data: mockBooks }),
      prisma.member.createMany({ data: mockMembers }),
    ]);
  });

  afterEach(async () => {
    await prisma.$transaction([
      prisma.transaction.deleteMany({}),
      prisma.book.deleteMany({}),
      prisma.member.deleteMany({}),
    ]);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Borrowind books', () => {
    it('should member not borrow more than 2 books', async () => {
      try {
        const memberCode = mockMembers[0].code;
        const booksCode = [
          mockBooks[0].code,
          mockBooks[1].code,
          mockBooks[2].code,
        ];

        await repository.create(booksCode[0], memberCode);
        await repository.create(booksCode[1], memberCode);

        await controller.create(booksCode[2], { memberCode });
      } catch (err) {
        expect(err.message).toEqual('Member can only borrow 2 books');
      }
    });

    it('should borrowed books are not borrowed by other members', async () => {
      try {
        const membersCode = [mockMembers[0].code, mockMembers[1].code];
        const bookCode = mockBooks[0].code;

        await repository.create(bookCode, membersCode[0]);
        await controller.create(bookCode, { memberCode: membersCode[1] });
      } catch (err) {
        expect(err.message).toEqual('Book has been borrowed');
      }
    });

    it('should member has a penalty', async () => {
      try {
        const memberCode = mockMembers[2].code;
        const bookCode = mockBooks[0].code;

        await controller.create(bookCode, { memberCode });
      } catch (err) {
        expect(err.message).toEqual('Member has a penalty');
      }
    });
  });

  describe('Returnig books', () => {
    it('should returned book is a book that the member has borrowed', async () => {
      try {
        const memberCode = mockMembers[0].code;
        const bookCode = mockBooks[0].code;

        await repository.create(bookCode, memberCode);
        const result = await controller.update(bookCode, { memberCode });
        expect(result).toEqual({ message: 'Book returned' });
      } catch (err) {
        expect(err.message).toEqual('Book has not been borrowed');
      }
    });

    it('should he book is returned after more than 7 days', async () => {
      try {
        const memberCode = mockMembers[0].code;
        const bookCode = mockBooks[0].code;

        const [borrowedBook] = await repository.create(bookCode, memberCode);

        // Update borrowDate to 8 days ago
        await repository.model.update({
          where: { id: borrowedBook.id },
          data: {
            borrowDate: new Date(new Date().setDate(new Date().getDate() - 8)),
          },
        });

        const result = await controller.update(bookCode, { memberCode });
        expect(result).toEqual({ message: 'Book returned' });

        const member = await prisma.member.findUnique({
          where: { code: memberCode },
        });
        expect(member.isPenalty).toBeTruthy();
      } catch (err) {
        expect(err.message).toEqual('Book has not been borrowed');
      }
    });
  });
});
