import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card, CardDocument } from 'src/schemas/card.schema';
import { CreateCardDto, GetCardsDto } from './card.dto';
import { Board, BoardDocument } from 'src/schemas/board.schema';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
    @InjectModel(Board.name) private readonly boardModel: Model<BoardDocument>,
  ) {}

  async createCard(
    userId: string,
    { list, name, description, start, due, participants }: CreateCardDto,
  ) {
    await this.cardModel.create({
      createdBy: userId,
      list,
      name,
      description,
      start,
      due,
      participants,
    });
  }

  async getCards(
    userId: string,
    { board: boardId, list: listId }: GetCardsDto,
  ) {
    if (boardId) {
      const board = await this.boardModel.findById(boardId);

      return await this.cardModel
        .find({ list: { $in: board.lists } })
        .populate({ path: 'participants', select: '_id name avatar' });
    }

    if (listId) {
      return await this.cardModel
        .find({ list: listId })
        .populate({ path: 'participants', select: '_id name avatar' });
    }

    return await this.cardModel
      .find({ createdBy: userId })
      .populate({ path: 'participants', select: '_id name avatar' });
  }
}
