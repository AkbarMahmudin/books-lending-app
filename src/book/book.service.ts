import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookRepository } from './repositories/book.repository';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.create(createBookDto);
  }

  async findAll() {
    const books = await this.bookRepository.findAll();
    const totalStock = await this.bookRepository.sumStock();

    return { books, totalStock: totalStock._sum.stock };
  }

  findOne(code: string) {
    return this.bookRepository.findOne({ code });
  }

  update(code: string, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update({ where: { code }, data: updateBookDto });
  }

  remove(code: string) {
    return this.bookRepository.remove({ code });
  }
}
