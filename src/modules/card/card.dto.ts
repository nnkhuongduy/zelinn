import {
  IsArray,
  IsDate,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateCardDto {
  @IsMongoId()
  @IsNotEmpty()
  list: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsOptional()
  start: Date;

  @IsDateString()
  @IsOptional()
  due: Date;

  @IsArray()
  @IsOptional()
  participants: string[];
}

export class GetCardsDto {
  @IsOptional()
  @IsMongoId()
  board: string;

  @IsOptional()
  @IsMongoId()
  list: string;
}
