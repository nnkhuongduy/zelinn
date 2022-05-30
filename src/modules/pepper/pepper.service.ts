import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Board, BoardDocument } from 'src/schemas/board.schema';
import { Card, CardDocument, CARD_STATES } from 'src/schemas/card.schema';
import { List, ListDocument, LIST_STATES } from 'src/schemas/list.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class PepperService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
    @InjectModel(Board.name) private readonly boardModel: Model<BoardDocument>,
    @InjectModel(List.name) private readonly listModel: Model<ListDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getPepper(userId: string, date: string) {
    const result = [];
    let boards = await this.boardModel
      .find({ members: userId })
      .select('_id name');
    const user = await this.userModel.findById(userId);

    boards = [
      ...boards.filter(({ _id }) => user.favBoards.includes(_id)),
      ...boards.filter(({ _id }) => !user.favBoards.includes(_id)),
    ];

    for (const board of boards) {
      const resultLists = [];
      const lists = await this.listModel
        .find({
          board: board._id,
          state: LIST_STATES[0],
        })
        .sort({ priority: 1, name: 1 });

      for (const list of lists) {
        const cards = await this.cardModel
          .find({
            list: list._id,
            state: CARD_STATES[0],
            participants: userId,
            start: { $lte: date },
            due: { $gte: date },
          })
          .sort('due')
          .populate({ path: 'participants', select: '_id avatar name' });

        if (cards.length)
          resultLists.push({
            name: list.name,
            priorty: list.priority,
            cards: [
              ...cards.filter(({ completed }) => !completed),
              ...cards.filter(({ completed }) => completed),
            ],
          });
      }

      if (resultLists.length)
        result.push({
          ...board.toJSON(),
          faved: user.favBoards.includes(board._id),
          lists: resultLists,
        });
    }

    return result;
  }
}
