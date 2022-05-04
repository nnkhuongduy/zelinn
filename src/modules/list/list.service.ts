import { Model, Schema } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument, LIST_STATES } from 'src/schemas/list.schema';
import { Board, BoardDocument } from 'src/schemas/board.schema';
import { CreateListDto, GetListsDto } from './list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name) private readonly listModel: Model<ListDocument>,
    @InjectModel(Board.name) private readonly boardModel: Model<BoardDocument>,
  ) {}

  async getLists(userId: string, { board: boardId }: GetListsDto) {
    const board = await this.boardModel.findById(boardId).populate('lists');

    if (!board) throw new NotFoundException('Board not found!');

    const isMember =
      (board.members as Schema.Types.ObjectId[]).findIndex(
        (id) => id.toString() === userId,
      ) !== -1;

    if (!isMember) throw new BadRequestException('Not a member');

    return (board.lists as List[]).filter(
      (list) => list.state === LIST_STATES[0],
    );
  }

  async createList(
    userId: string,
    { board: boardId, name, position }: CreateListDto,
  ) {
    const board = await this.boardModel.findById(boardId);

    if (!board) throw new NotFoundException('Board not found!');

    const isMember =
      (board.members as Schema.Types.ObjectId[]).findIndex(
        (id) => id.toString() === userId,
      ) !== -1;

    if (!isMember) throw new BadRequestException('Not a member');

    const list = await this.listModel.create({
      board: boardId,
      name,
    });

    board.lists.splice(position - 1, 0, [list._id] as any);

    await board.save();
  }
}
