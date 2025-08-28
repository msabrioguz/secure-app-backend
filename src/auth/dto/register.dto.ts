import { ValidationMessages } from '_base/enum/ValidationMessages.enum';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: ValidationMessages.EMAIL_ISEMAIL })
  email: string;

  @IsString({ message: ValidationMessages.PASSWORD_ISSTRING })
  @MinLength(6, { message: ValidationMessages.PASSWORD_ISMIN })
  @MaxLength(32, { message: ValidationMessages.PASSWORD_ISMAX })
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;
}
