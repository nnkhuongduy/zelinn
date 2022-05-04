import { Model } from 'mongoose';
import {
  ConflictException,
  GoneException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';

import { User, UserDocument } from 'src/schemas/user.schema';
import { Verification } from 'src/schemas/verification.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly mailerService: MailerService,
  ) {}

  async verify(email: string, code: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new NotFoundException('User not found!');

    if (!user.verification)
      throw new NotAcceptableException('Verification not found!');

    if (dayjs(user.verification.expireAt).isBefore(dayjs()))
      throw new GoneException('Verification code is expired!');

    if (user.verification.code !== code)
      throw new ConflictException('Verification code is incorrect!');

    user.verification = null;
    await user.save();

    const { verification, ..._user } = user.toJSON();

    return _user as UserDocument;
  }

  async checkUser(email: string): Promise<boolean> {
    return Boolean(await this.userModel.exists({ email }));
  }

  async sendVerification(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new NotFoundException('User not found!');

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

  async auth(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).select('-verification');

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }
}
