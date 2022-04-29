import { Model } from 'mongoose';
import {
  ConflictException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';

import { User, UserDocument } from 'src/schemas/user.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { Verification } from 'src/schemas/verification.schema';
import { VerifyDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly mailerService: MailerService,
  ) {}

  async login(email: string) {
    let user = await this.userModel.findOne({ email });

    if (!user)
      user = await this.userModel.create({
        email,
      });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.verification = new Verification();
    user.verification.code = code;
    user.verification.expireAt = dayjs().add(5, 'm').toDate();

    await user.save();
    await this.mailerService.sendMail({
      to: email,
      subject: 'Mã đăng nhập',
      text: `Mã đăng nhập zelinn của bạn: ${code}`,
    });
  }

  async verify({ email, code }: VerifyDto): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new NotFoundException('User not found!');

    if (dayjs(user.verification.expireAt).isBefore(dayjs()))
      throw new GoneException('Verification code is expired!');

    if (user.verification.code !== code)
      throw new ConflictException('Verification code is incorrect!');

    user.verification = null;
    await user.save();

    return user;
  }

  async checkUser(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) return false;

    return true;
  }
}
