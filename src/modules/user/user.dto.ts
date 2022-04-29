import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;
}

export class VerifyDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6)
  code: string;
}
