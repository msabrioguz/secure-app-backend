import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExchangeRateDto {
  @IsNotEmpty({ message: 'Para birimi boş olamaz.' })
  @IsString({ message: 'Para birimi string olmalıdır.' })
  currency: string;

  @IsNotEmpty({ message: 'Para değeri boş olamaz.' })
  @IsNumber({}, { message: 'Para miktarı number olmalıdır.' })
  rate: number;
}
