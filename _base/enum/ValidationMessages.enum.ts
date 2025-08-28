export enum ValidationMessages {
  NAME_ISNOTEMPTY = 'İsim alanı boş olamaz.',
  NAME_ISSTRING = 'İsim alanı metin olmalıdır.',
  NAME_ISMIN = 'İsim alanı en az 2 karakter olmalıdır.',
  NAME_ISMAX = 'İsim alanı en fazla 50 karakter olmalıdır.',
  EMAIL_ISNOTEMPTY = 'Email alanı boş olamaz.',
  EMAIL_ISEMAIL = 'Geçersiz email formatı.',
  PASSWORD_ISNOTEMPTY = 'Parola alanı boş olamaz.',
  PASSWORD_ISMIN = 'Parola en az $constraint1 karakter olmalıdır.',
  PASSWORD_ISMAX = 'Parola en fazla $constraint1 karakter olmalıdır.',
  PASSWORD_ISSTRING = 'Parola metin olmalıdır.',
  ROLE_ISNOTEMPTY = 'Rol alanı boş olamaz.',
}
