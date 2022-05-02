import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Board, BoardDocument } from 'src/schemas/board.schema';
import { PostBoardDto, UpdateBoardDto } from './board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private readonly boardModel: Model<BoardDocument>,
  ) {}

  async getBoards(userId: string) {
    return await this.boardModel.find({ owner: userId }).select('-owner');
  }

  async createBoard(
    userId: string,
    { name, thumbnail, permission }: PostBoardDto,
  ) {
    await this.boardModel.create({
      owner: userId,
      name,
      thumbnail,
      permission,
    });
  }

  async updateBoard(
    userId: string,
    { id, name, permission, thumbnail }: UpdateBoardDto,
  ): Promise<BoardDocument> {
    const board = await this.boardModel
      .findOne({ _id: id, owner: userId })
      .select('-owner');

    if (!board) throw new NotFoundException('Board not found!');

    board.name = name;
    board.permission = permission;
    board.thumbnail = thumbnail;

    await board.save();

    return board;
  }
}
