import { ValidationMessages } from '_base/enum/ValidationMessages.enum';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: ValidationMessages.EMAIL_ISEMAIL })
  email: string;

  @IsString({ message: ValidationMessages.PASSWORD_ISSTRING })
  @IsNotEmpty({ message: ValidationMessages.PASSWORD_ISNOTEMPTY })
  password: string;
}
