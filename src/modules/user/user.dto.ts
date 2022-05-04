import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserRegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(12)
  phone: string;
}

export class UserEditDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(12)
  phone: string;
}

export class UserFavBoardDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
