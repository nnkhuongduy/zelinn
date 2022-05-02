import { IsIn, IsMongoId, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { BoardPermission, BOARD_PERMISSIONS } from 'src/schemas/board.schema';

export class PostBoardDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  thumbnail: string;

  @IsNotEmpty()
  @IsIn(BOARD_PERMISSIONS)
  permission: BoardPermission;
}

export class UpdateBoardDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  thumbnail: string;

  @IsNotEmpty()
  @IsIn(BOARD_PERMISSIONS)
  permission: BoardPermission;
}