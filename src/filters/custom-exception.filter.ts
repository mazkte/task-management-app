import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '';
    let response: any;
    if (exception instanceof HttpException) {
      if (
        typeof exception.getResponse() === 'object' &&
        exception.getResponse() !== null
      ) {
        response = Array.isArray(exception.getResponse())
          ? exception.getResponse()
          : [exception.getResponse()];
      }
      httpStatus = exception.getStatus();
      message = exception.message;
    }

    const responseBody = {
      details: response,
      statusCode: httpStatus,
      createdAt: new Date().toISOString(),
      endpoint:
        ' [' +
        ctx.getRequest().method +
        '] - ' +
        httpAdapter?.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
