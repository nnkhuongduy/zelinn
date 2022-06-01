/// <reference types="multer" />
import { Model } from 'mongoose';
import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDocument } from 'src/schemas/user.schema';
export declare class UploadService implements OnModuleInit {
    private readonly userModel;
    private readonly configService;
    constructor(userModel: Model<UserDocument>, configService: ConfigService);
    onModuleInit(): void;
    uploadAvatar(userId: string, file: Express.Multer.File): Promise<UserDocument>;
    uploadThumbnail(file: Express.Multer.File): Promise<string>;
}
