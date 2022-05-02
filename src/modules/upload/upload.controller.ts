import {
  Post,
  UseInterceptors,
  UploadedFile,
  Controller,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtUser } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const { _id } = req.user as JwtUser;

    return await this.uploadService.uploadAvatar(_id, file);
  }

  @Post('thumbnail')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('thumbnail'))
  async uploadThumbnail(@UploadedFile() file: Express.Multer.File) {
    return {
      url: await this.uploadService.uploadThumbnail(file),
    };
  }
}
