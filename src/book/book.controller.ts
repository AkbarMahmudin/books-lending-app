import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The book has been successfully created.',
    type: CreateBookDto,
  })
  @ApiConflictResponse({
    description: 'The book already exists.',
  })
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @ApiOkResponse({
    description: 'The books have been successfully found.',
    type: [CreateBookDto],
  })
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @ApiOkResponse({
    description: 'The book has been successfully found.',
    type: CreateBookDto,
  })
  @ApiNotFoundResponse({
    description: 'The book does not exist.',
  })
  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.bookService.findOne(code);
  }

  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated.',
    type: CreateBookDto,
  })
  @ApiNotFoundResponse({
    description: 'The book does not exist.',
  })
  @ApiConflictResponse({
    description: 'The book already exists.',
  })
  @Patch(':code')
  update(@Param('code') code: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(code, updateBookDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The book has been successfully removed.',
    type: CreateBookDto,
  })
  @ApiNotFoundResponse({
    description: 'The book does not exist.',
  })
  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.bookService.remove(code);
  }
}
