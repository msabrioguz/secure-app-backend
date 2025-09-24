import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSettingDto {
  @IsString({
    message: 'Ayar profil ismi alanı string veri türünden olmalıdır.',
  })
  @IsNotEmpty({ message: 'Ayar profil ismi boş olamaz.' })
  name: string;

  @IsString({
    message: 'Ayar profil ismi alanı string veri türünden olmalıdır.',
  })
  @IsNotEmpty({ message: 'Uygulama ismi boş olamaz.' })
  title: string;

  @IsNotEmpty({ message: 'Bakım alanı boş olamaz.' })
  @IsBoolean({ message: 'Bakım alanı boolean veri türünden olmalıdır.' })
  maintenance: boolean;

  @IsNotEmpty({ message: 'Port alanı boş olamaz.' })
  @IsNumber({}, { message: 'Port alanı number veri türünden olmalıdır.' })
  appPort: number;

  @IsNotEmpty({ message: 'Kayıt Onaylama alanı boş olamaz.' })
  @IsNumber(
    {},
    { message: 'Kayıt Onaylama alanı number veri türünden olmalıdır.' },
  )
  registerValidation: number;

  @IsString({
    message: 'E-posta servis alanı string veri türünden olmalıdır.',
  })
  @IsNotEmpty({ message: 'E-posta servis alanı boş olamaz.' })
  emailService: string;

  @IsString({
    message: 'E-Posta sunucu alanı string veri türünden olmalıdır.',
  })
  @IsNotEmpty({ message: 'E-Posta sunucu alanı boş olamaz.' })
  emailHost: string;

  @IsNotEmpty({ message: 'E-Posta Port alanı boş olamaz.' })
  @IsNumber(
    {},
    { message: 'E-Posta Port alanı number veri türünden olmalıdır.' },
  )
  emailPort: number;

  @IsString({
    message: 'E-Posta kullanıcı adı string veri türünden olmalıdır.',
  })
  @IsNotEmpty({ message: 'E-Posta kullanıcı adı alanı boş olamaz.' })
  emailUser: string;

  @IsString({
    message: 'E-Posta şifre alanı string veri türünden olmalıdır.',
  })
  @IsNotEmpty({ message: 'E-Posta şifre alanı boş olamaz.' })
  emailPass: string;
}
