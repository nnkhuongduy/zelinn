import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { UserDocument } from 'src/schemas/user.schema';
import { JwtUser } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UserEditDto, UserRegisterDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: UserRegisterDto): Promise<UserDocument> {
    return await this.userService.register(body);
  }

  @Post('edit')
  @UseGuards(JwtAuthGuard)
  async edit(@Body() body: UserEditDto, @Req() req): Promise<UserDocument> {
    const { _id } = req.user as JwtUser;

    return await this.userService.edit(_id, body);
  }
}
