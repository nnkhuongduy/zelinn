import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateListDto {
  @IsMongoId()
  @IsNotEmpty()
  board: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  priority: number;
}

export class GetListsDto {
  @IsMongoId()
  @IsNotEmpty()
  board: string;
}

export class GetListDto {
  @IsMongoId()
  @IsOptional()
  list: string;

  @IsMongoId()
  @IsOptional()
  card: string;
}

export class UpdateListDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  priority: number;
}

export class DeleteListDto {
  @IsNotEmpty()
  @IsMongoId()
  list: string;
}
