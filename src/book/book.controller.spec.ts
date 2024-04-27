import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BookRepository } from './repositories/book.repository';

describe('BookController', () => {
  let controller: BookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [BookController],
      providers: [BookService, BookRepository],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a book', async () => {
    const book = await controller.create({
      code: '1234567890',
      title: 'Test Book',
      author: 'Test Author',
      stock: 10,
    });
    expect(book).toBeDefined();
    expect(book.code).toBe('1234567890');
  });

  it('should return an array of books', async () => {
    const result = await controller.findAll();
    expect(result).toHaveProperty('books');
    expect(result.books).toBeInstanceOf(Array);
    expect(result).toHaveProperty('totalStock');
    expect(result.totalStock).toBeGreaterThan(0);
  });

  it('should return a book', async () => {
    const book = await controller.findOne('1234567890');
    expect(book).toBeDefined();
    expect(book.code).toBe('1234567890');
  });

  it('should update a book', async () => {
    const book = await controller.update('1234567890', {
      title: 'Updated Book',
      author: 'Updated Author',
      stock: 20,
    });
    expect(book).toBeDefined();
    expect(book.title).toBe('Updated Book');
  });

  it('should remove a book', async () => {
    const book = await controller.remove('1234567890');
    expect(book).toBeDefined();
  });
});
