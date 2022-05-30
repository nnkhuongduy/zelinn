import { Model, Schema } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument, LIST_STATES } from 'src/schemas/list.schema';
import { Board, BoardDocument, BOARD_STATES } from 'src/schemas/board.schema';
import {
  CreateListDto,
  DeleteListDto,
  GetListDto,
  GetListsDto,
  UpdateListDto,
} from './list.dto';
import { Card, CardDocument, CARD_STATES } from 'src/schemas/card.schema';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name) private readonly listModel: Model<ListDocument>,
    @InjectModel(Board.name) private readonly boardModel: Model<BoardDocument>,
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
  ) {}

  async getLists(userId: string, { board: boardId }: GetListsDto) {
    const board = await this.boardModel.findOne({
      _id: boardId,
      state: BOARD_STATES[0],
      members: userId,
    });

    if (!board) throw new NotFoundException('Board not found!');

    const lists = await this.listModel
      .find({
        board: board._id,
        state: LIST_STATES[0],
      })
      .sort({ priority: 1, name: 1 });
    const result = [];

    for (const list of lists) {
      const cards = await this.cardModel
        .find({
          list: list._id,
          state: CARD_STATES[0],
        })
        .sort('due')
        .populate({ path: 'participants', select: '_id name avatar' });

      result.push({
        ...list.toJSON(),
        cards: [
          ...cards.filter(({ completed }) => !completed),
          ...cards.filter(({ completed }) => completed),
        ],
      });
    }

    return result;
  }

  async createList(
    userId: string,
    { board: boardId, name, priority }: CreateListDto,
  ) {
    const board = await this.boardModel.findById(boardId);

    if (!board) throw new NotFoundException('Board not found!');

    const isMember =
      (board.members as Schema.Types.ObjectId[]).findIndex(
        (id) => id.toString() === userId,
      ) !== -1;

    if (!isMember) throw new BadRequestException('Not a member');

    await this.listModel.create({
      board: boardId,
      name,
      priority,
    });
  }

  async getList(userId: string, { list: listId, card: cardId }: GetListDto) {
    let list = null;

    if (listId)
      list = await this.listModel.findOne({
        _id: listId,
        state: LIST_STATES[0],
      });

    if (cardId) {
      const card = await this.cardModel.findOne({
        _id: cardId,
        state: CARD_STATES[0],
      });

      list = await this.listModel.findOne({
        _id: card.list,
        state: LIST_STATES[0],
      });
    }

    if (!list) throw new NotFoundException('List not found!');

    const board = await this.boardModel.findOne({
      _id: list.board,
      state: BOARD_STATES[0],
      members: userId,
    });

    if (!board) throw new NotFoundException('Board not found!');

    return list;
  }

  async updateList(userId: string, { id, name, priority }: UpdateListDto) {
    const list = await this.listModel.findOne({
      _id: id,
      state: LIST_STATES[0],
    });

    if (!list) throw new NotFoundException('List not found!');

    const board = await this.boardModel.findOne({
      _id: list.board,
      state: BOARD_STATES[0],
      members: userId,
    });

    if (!board) throw new NotFoundException('Board not found!');

    list.name = name;
    list.priority = priority;

    await list.save();
  }

  async deleteList(userId: string, { list: listId }: DeleteListDto) {
    const list = await this.listModel.findOne({
      _id: listId,
      state: LIST_STATES[0],
    });

    if (!list) throw new NotFoundException('List not found!');

    const board = await this.boardModel.findOne({
      _id: list.board,
      state: BOARD_STATES[0],
      members: userId,
    });

    if (!board) throw new NotFoundException('Board not found!');

    list.state = LIST_STATES[1];

    await list.save();
    await this.cardModel.updateMany(
      { list: list._id },
      {
        state: LIST_STATES[1],
      },
    );
  }
}
