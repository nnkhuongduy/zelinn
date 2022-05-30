import {
  IsArray,
  IsBoolean,
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
  @IsNotEmpty()
  start: Date;

  @IsDateString()
  @IsNotEmpty()
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

export class GetCardDto {
  @IsNotEmpty()
  @IsMongoId()
  card: string;
}

export class CompleteCardDto {
  @IsNotEmpty()
  @IsMongoId()
  card: string;
}

export class DeleteCardDto {
  @IsNotEmpty()
  @IsMongoId()
  card: string;
}
