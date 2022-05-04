import { Model, Schema } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Board, BoardDocument } from 'src/schemas/board.schema';
import {
  InviteDto,
  PostBoardDto,
  QueryUserDto,
  RemoveMembersDto,
  ResponseInviteDto,
  UpdateBoardDto,
} from './board.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import {
  Notification,
  NotificationDocument,
  NOTIFICATION_TYPES,
} from 'src/schemas/notification.schema';
import { Invitation, InvitationDocument } from 'src/schemas/invitation.schema';

@Injectable()
export class BoardService implements OnModuleInit {
  constructor(
    @InjectModel(Board.name) private readonly boardModel: Model<BoardDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
    @InjectModel(Invitation.name)
    private readonly invitationModel: Model<InvitationDocument>,
  ) {}

  async onModuleInit() {
    try {
      if (
        await this.boardModel.collection.indexExists([
          'owner.email',
          'owner.phone',
        ])
      ) {
        this.boardModel.collection.dropIndex('owner.email');
        this.boardModel.collection.dropIndex('owner.phone');
      }
    } catch {}
  }

  async getBoards(userId: string) {
    const boards = await this.boardModel
      .find({ members: userId })
      .populate({ path: 'owner', select: '_id name avatar' })
      .populate({ path: 'members', select: '_id name avatar email' })
      .populate({ path: 'pending', select: '_id name avatar email' });
    let isOwner = false;

    if (boards.length > 0)
      isOwner = (boards[0].owner as any)._id.toString() === userId;

    return boards.map((board) => {
      const _board = board.toJSON();
      return {
        ..._board,
        members: _board.members.map((member) => ({
          ...member,
          email: isOwner ? member.email : undefined,
        })),
        pending: _board.pending.map((member) => ({
          ...member,
          email: isOwner ? member.email : undefined,
          pending: true,
        })),
      };
    });
  }

  async getBoard(userId: string, boardId: string): Promise<BoardDocument> {
    const board = await this.boardModel
      .findById(boardId)
      .populate({ path: 'owner', select: '_id name avatar' })
      .populate({ path: 'members', select: '_id name avatar email' })
      .populate({ path: 'pending', select: '_id name avatar email' });
    const isOwn =
      (board.members as UserDocument[]).findIndex(
        ({ _id }) => _id.toString() === userId,
      ) !== -1;
    const isOwner = (board.owner as UserDocument).id === userId;

    if (!board) throw new NotFoundException('Board not found!');
    if (!isOwn) throw new BadRequestException('Not a member of this board!');

    const _board = board.toJSON();

    return {
      ..._board,
      members: _board.members.map((member) => ({
        ...member,
        email: isOwner ? member.email : undefined,
      })),
      pending: _board.pending.map((member) => ({
        ...member,
        email: isOwner ? member.email : undefined,
        pending: true,
      })),
    } as BoardDocument;
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
      members: [userId],
    });
  }

  async updateBoard(
    userId: string,
    {
      id,
      name,
      permission,
      thumbnail,
      owner: ownerId,
      description,
    }: UpdateBoardDto,
  ) {
    const board = await this.boardModel.findOne({ _id: id, owner: userId });

    if (!board) throw new NotFoundException('Board not found!');

    const oldName = board.name;
    const oldDescription = board.description;
    const oldThumbnail = board.thumbnail;
    const oldOwner = board.owner;

    board.name = name;
    board.permission = permission;
    board.thumbnail = thumbnail;
    board.owner = ownerId as any;
    board.description = description;

    this.notificationModel.create({
      user: oldOwner,
      title: `Thông tin bảng ${oldName} đã được cập nhật`,
      label: `Bảng ${oldName}`,
      description: oldDescription,
      icon: oldThumbnail,
    });

    if (oldOwner.toString() !== ownerId) {
      this.notificationModel.create({
        user: oldOwner,
        title: `Bạn không còn sở hữu bảng ${oldName}!`,
        label: `Bảng ${oldName}`,
        description: `Quyền sở hữu của bảng này đã bị thay đổi!`,
        icon: oldThumbnail,
      });

      this.notificationModel.create({
        user: ownerId,
        title: `Bạn đã được cập nhật sở hữu bảng ${oldName}!`,
        label: `Bảng ${oldName}`,
        description: `Quyền sở hữu của bảng này đã được thay đổi!`,
        icon: oldThumbnail,
      });
    }

    await board.save();
  }

  async queryUserToInvite(
    userId: string,
    { board: boardId, value }: QueryUserDto,
  ) {
    const board = await this.boardModel.findById(boardId);

    if (!board) throw new NotFoundException('Board not found!');

    const users = await this.userModel
      .find({
        $and: [
          { $or: [{ email: value }, { name: value }] },
          { _id: { $ne: userId } },
          { _id: { $nin: board.pending } },
        ],
      })
      .select('_id name email avatar');

    return users.map((user) => ({
      ...user.toJSON(),
      pending: board.pending.includes(user._id),
    }));
  }

  async invite(ownerId: string, { members, board: boardId }: InviteDto) {
    const board = await this.boardModel.findById(boardId);
    const owner = await this.userModel.findById(ownerId);

    if (!board) throw new NotFoundException('Board not found!');
    if (!owner) throw new NotFoundException('Owner not found!');

    for (const member of members) {
      const user = await this.userModel.findById(member);

      const notification = await this.notificationModel.create({
        user,
        title: `${owner.name} đã mời bạn tham gia bảng!`,
        label: board.name,
        description: board.description,
        icon: board.thumbnail,
        type: NOTIFICATION_TYPES[1],
      });

      await this.invitationModel.create({
        board: board._id,
        user: member,
        notification: notification._id,
      });
    }

    board.pending = [...board.pending, ...(members as any)];

    await board.save();
  }

  async responseInvitation(
    userId: string,
    { notification: notiId, result }: ResponseInviteDto,
  ) {
    const notification = await this.notificationModel.findById(notiId);
    const user = await this.userModel.findById(userId);
    const invitation = await this.invitationModel.findOne({
      user: userId,
      notification: notiId,
    });

    if (!notification) throw new NotFoundException('Notification not found!');
    if (!user) throw new NotFoundException('User not found!');
    if (!invitation) throw new NotFoundException('Invitation not found!');

    notification.seen = true;
    invitation.confirmed = true;
    invitation.result = result;

    await notification.save();
    await invitation.save();

    const board = await this.boardModel
      .findById(invitation.board)
      .populate('owner');

    board.pending = (board.pending as Schema.Types.ObjectId[]).filter(
      (id) => id.toString() !== userId,
    );

    if (result) {
      board.members.push(userId as any);

      await this.notificationModel.create({
        user: userId,
        title: `Bạn đã chấp nhận lời mời tham gia bảng của ${
          (board.owner as User).name
        }`,
        label: board.name,
        description: board.description,
        icon: board.thumbnail,
      });
    } else {
      await this.notificationModel.create({
        user: userId,
        title: `Bạn đã từ chối lời mời tham gia bảng của ${
          (board.owner as User).name
        }`,
        label: board.name,
        description: board.description,
        icon: board.thumbnail,
      });
    }

    await board.save();
  }

  async removeMembers(
    userId: string,
    { board: boardId, members }: RemoveMembersDto,
  ) {
    const board = await this.boardModel
      .findById(boardId)
      .populate({ path: 'owner', select: '_id name avatar' });

    if (!board) throw new NotFoundException('Board not found');
    if ((board.owner as UserDocument)._id.toString() !== userId)
      throw new BadRequestException('Not the owner');

    board.members = (board.members as Schema.Types.ObjectId[]).filter(
      (id) => !members.includes(id.toString()),
    );

    for (const memberId of board.members) {
      this.userModel.findByIdAndUpdate(memberId.toString(), {
        $pull: {
          favBoards: boardId,
        },
      });
    }

    await board.save();
  }
}
