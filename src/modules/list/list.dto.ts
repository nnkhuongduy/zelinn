import { IsInt, IsMongoId, IsNotEmpty, Min } from 'class-validator';

export class CreateListDto {
  @IsMongoId()
  @IsNotEmpty()
  board: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  position: number;
}

export class GetListsDto {
  @IsMongoId()
  @IsNotEmpty()
  board: string;
}
