import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class AuthVerifyDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6)
  code: string;
}
