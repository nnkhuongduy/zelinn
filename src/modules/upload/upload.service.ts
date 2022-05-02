import { Model } from 'mongoose';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

import { config, S3 } from 'aws-sdk';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UploadService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    config.update({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
  }

  async uploadAvatar(
    userId: string,
    file: Express.Multer.File,
  ): Promise<UserDocument> {
    const user = await this.userModel.findById(userId).select('-verification');

    if (!user) throw new NotFoundException('User not found');

    const s3 = new S3();
    const result = await s3
      .upload({
        Bucket: this.configService.get<string>('AWS_BUCKET'),
        Body: file.buffer,
        Key: file.originalname,
      })
      .promise();

    user.avatar = result.Location;

    await user.save();

    return user;
  }

  async uploadThumbnail(file: Express.Multer.File): Promise<string> {
    const s3 = new S3();
    const result = await s3
      .upload({
        Bucket: this.configService.get<string>('AWS_BUCKET'),
        Body: file.buffer,
        Key: file.originalname,
      })
      .promise();

    return result.Location;
  }
}
