import { Model, Schema } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card, CardDocument, CARD_STATES } from 'src/schemas/card.schema';
import {
  CompleteCardDto,
  CreateCardDto,
  DeleteCardDto,
  GetCardDto,
  GetCardsDto,
} from './card.dto';
import { Board, BoardDocument, BOARD_STATES } from 'src/schemas/board.schema';
import { List, ListDocument, LIST_STATES } from 'src/schemas/list.schema';
import {
  Notification,
  NotificationDocument,
} from 'src/schemas/notification.schema';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
    @InjectModel(Board.name) private readonly boardModel: Model<BoardDocument>,
    @InjectModel(List.name) private readonly listModel: Model<ListDocument>,
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
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

    for (const participant of participants)
      this.notificationModel.create({
        user: participant,
        title: `Bạn đã được thêm vào thẻ ${name}`,
        description: description,
      });
  }

  async getCards(
    userId: string,
    { board: boardId, list: listId }: GetCardsDto,
  ) {
    if (boardId) {
      const board = await this.boardModel.findOne({
        _id: boardId,
        state: BOARD_STATES[0],
      });
      const lists = await this.listModel
        .find({ board: board._id, state: LIST_STATES[0] })
        .sort({ priority: 1, name: 1 });

      return await this.cardModel
        .find({ list: { $in: lists.map(({ _id }) => _id) } })
        .populate({ path: 'participants', select: '_id name avatar' });
    }

    if (listId) {
      return await this.cardModel
        .find({ list: listId, state: CARD_STATES[0] })
        .populate({ path: 'participants', select: '_id name avatar' });
    }

    return await this.cardModel
      .find({ createdBy: userId, state: CARD_STATES[0] })
      .populate({ path: 'participants', select: '_id name avatar' });
  }

  async getCard(userId: string, { card: cardId }: GetCardDto) {
    const card = await this.cardModel
      .findOne({
        _id: cardId,
        state: CARD_STATES[0],
      })
      .populate({ path: 'participants', select: '_id name avatar' })
      .select('-state');

    if (!card) throw new NotFoundException('Card not found!');

    const list = await this.listModel.findOne({
      _id: card.list,
      state: LIST_STATES[0],
    });

    if (!list) throw new NotFoundException('List not found!');

    const board = await this.boardModel.findOne({
      _id: list.board,
      state: BOARD_STATES[0],
      members: userId,
    });

    if (!board) throw new NotFoundException('Board not found!');

    card.thumbnail = card.thumbnail || board.thumbnail;

    return card;
  }

  async completeCard(userId: string, { card: cardId }: CompleteCardDto) {
    const card = await this.cardModel.findOne({
      _id: cardId,
      state: CARD_STATES[0],
    });

    if (!card) throw new NotFoundException('Card not found!');

    const list = await this.listModel.findOne({
      _id: card.list,
      state: LIST_STATES[0],
    });

    if (!list) throw new NotFoundException('List not found!');

    const board = await this.boardModel.findOne({
      _id: list.board,
      state: BOARD_STATES[0],
      members: userId,
    });

    if (!board) throw new NotFoundException('Board not found!');

    card.completed = !card.completed;

    await card.save();

    if (card.completed)
      for (const participant of card.participants) {
        this.notificationModel.create({
          user: participant as Schema.Types.ObjectId,
          title: `Thẻ ${card.name} đã hoàn thành`,
          description: card.description,
        });
      }
  }

  async deleteCard(userId: string, { card: cardId }: DeleteCardDto) {
    const card = await this.cardModel.findOne({
      _id: cardId,
      state: CARD_STATES[0],
    });

    if (!card) throw new NotFoundException('Card not found!');

    const list = await this.listModel.findOne({
      _id: card.list,
      state: LIST_STATES[0],
    });

    if (!list) throw new NotFoundException('List not found!');

    const board = await this.boardModel.findOne({
      _id: list.board,
      state: BOARD_STATES[0],
      members: userId,
    });

    if (!board) throw new NotFoundException('Board not found!');

    card.state = CARD_STATES[1];

    await card.save();

    for (const participant of card.participants) {
      this.notificationModel.create({
        user: participant as Schema.Types.ObjectId,
        title: `Thẻ ${card.name} đã bị xóa`,
        description: card.description,
      });
    }
  }
}
