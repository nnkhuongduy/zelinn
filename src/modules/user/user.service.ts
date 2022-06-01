import { Model } from 'mongoose';
import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from 'src/schemas/user.schema';
import { UserEditDto, UserFavBoardDto, UserRegisterDto } from './user.dto';
import { AuthService } from '../auth/auth.service';
import {
  Notification,
  NotificationDocument,
} from 'src/schemas/notification.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
    private readonly authService: AuthService,
  ) {}

  async register({
    name,
    phone,
    email,
  }: UserRegisterDto): Promise<UserDocument> {
    if (await this.userModel.exists({ $or: [{ phone }, { email }] }))
      throw new NotAcceptableException('User already existed!');

    const user = await this.userModel.create({
      name,
      phone,
      email,
    });

    await this.authService.sendVerification(email);

    const { verification, ..._user } = user;

    return _user as UserDocument;
  }

  async edit(id: string, { name, phone }: UserEditDto): Promise<UserDocument> {
    const user = await this.userModel.findById(id).select('-verification');

    if (!user) throw new NotFoundException('User not found!');

    if (user.phone !== phone && (await this.userModel.exists({ phone })))
      throw new ConflictException(
        'User with this phone number already existed!',
      );

    user.name = name;
    user.phone = phone;

    await user.save();

    this.notificationModel.create({
      user: id,
      title: `Thông tin cá nhân đã được cập nhật`,
      label: `Cập nhật thông tin`,
      description: '',
    });

    return user;
  }

  async favBoard(userId: string, { id: boardId }: UserFavBoardDto) {
    const user = await this.userModel.findById(userId).select('-verification');

    if (!user) throw new NotFoundException('User not found!');

    if (user.favBoards.find((id) => id.toString() === boardId)) {
      user.favBoards = user.favBoards.filter((id) => id.toString() !== boardId);
    } else {
      user.favBoards.push(boardId as any);
    }

    await user.save();

    return user;
  }
}
