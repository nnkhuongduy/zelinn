import {
  IsArray,
  IsBoolean,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';
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

  @IsNotEmpty()
  @IsMongoId()
  owner: string;

  @IsString()
  description: string;
}

export class QueryUserDto {
  @IsNotEmpty()
  @IsMongoId()
  board: string;

  @IsNotEmpty()
  query: string;
}

export class InviteDto {
  @IsArray()
  @IsNotEmpty()
  members: string[];

  @IsMongoId()
  @IsNotEmpty()
  board: string;
}

export class ResponseInviteDto {
  @IsNotEmpty()
  @IsMongoId()
  notification: string;

  @IsBoolean()
  @IsNotEmpty()
  result: boolean;
}

export class RemoveMembersDto {
  @IsNotEmpty()
  @IsMongoId()
  board: string;

  @IsArray()
  members: string[];
}

export class GetBoardDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class LeaveBoardDto {
  @IsMongoId()
  @IsNotEmpty()
  board: string;
}

export class DeleteBoardDto {
  @IsMongoId()
  @IsNotEmpty()
  board: string;
}
