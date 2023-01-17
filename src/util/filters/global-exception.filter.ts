import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Generic Exception filter.
 *
 */
@Catch()
export class GlobalExceptionHandlerFilter implements ExceptionFilter {
  logger: Logger = new Logger(GlobalExceptionHandlerFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const error = exception;
    const errorMessage = exception?.message;
    const validationErrors: string[] = error?.response?.message || [];
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      errorMessage,
      validationErrors,
    });
  }
}
