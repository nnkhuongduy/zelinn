import { Model } from 'mongoose';
import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from 'src/schemas/user.schema';
import { UserEditDto, UserRegisterDto } from './user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
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

    return user;
  }

  async edit(id: string, { name, phone }: UserEditDto): Promise<UserDocument> {
    const user = await this.userModel.findById(id).select('-verification');

    if (!user) throw new NotFoundException('User not found!');

    if (user.phone !== phone && await this.userModel.exists({ phone }))
      throw new ConflictException(
        'User with this phone number already existed!',
      );

    user.name = name;
    user.phone = phone;

    await user.save();

    return user;
  }
}
