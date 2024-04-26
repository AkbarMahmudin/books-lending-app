import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          return response.status(409).json({
            statusCode: 409,
            message: 'Data already exists',
          });
        case 'P2025':
          return response.status(404).json({
            statusCode: 404,
            message: 'Data not found',
          });
      }
    }

    response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
