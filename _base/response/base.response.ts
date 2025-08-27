import { ResponseMessages } from '_base/enum/ResponseMessages.enum';

export class BaseResponse<T> {
  success: boolean;
  message: ResponseMessages;
  data: T | null;

  constructor(
    success: boolean,
    message: ResponseMessages = ResponseMessages.SUCCESS,
    data: T | null = null,
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
