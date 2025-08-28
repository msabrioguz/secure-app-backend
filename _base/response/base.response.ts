import { ResponseMessages } from '_base/enum/ResponseMessages.enum';

export class BaseResponse<T> {
  status: number;
  success: boolean;
  message: ResponseMessages;
  data: T | null;

  constructor(
    status: number = 200,
    success: boolean,
    message: ResponseMessages = ResponseMessages.SUCCESS,
    data: T | null = null,
  ) {
    this.status = status;
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
