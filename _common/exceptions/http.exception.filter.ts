import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ResponseMessages } from '_base/enum/ResponseMessages.enum';
import { BaseResponse } from '_base/response/base.response';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // response.status(status).json({
    //   statusCode: status,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    // });

    let responseMessage: ResponseMessages;

    switch (status) {
      case 400:
        responseMessage = ResponseMessages.BAD_REQUEST;
        break;
      case 401:
        responseMessage = ResponseMessages.UNAUTHORIZED;
        break;
      case 403:
        responseMessage = ResponseMessages.FORBIDDEN;
        break;
      case 404:
        responseMessage = ResponseMessages.NOT_FOUND;
        break;
      case 500:
        responseMessage = ResponseMessages.INTERNAL_SERVER_ERROR;
        break;
      default:
        responseMessage = ResponseMessages.ERROR;
    }

    response
      .status(status)
      .json(new BaseResponse(status, false, responseMessage, null));
  }
}
