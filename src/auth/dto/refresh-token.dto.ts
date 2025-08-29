import { ValidationMessages } from '_base/enum/ValidationMessages.enum';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString({ message: ValidationMessages.RESRESH_TOKEN_ISSTRING })
  @IsNotEmpty({ message: ValidationMessages.RESRESH_TOKEN_ISNOTEMPTY })
  refreshToken: string;
}
