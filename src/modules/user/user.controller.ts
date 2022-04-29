import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import MongooseClassSerializerInterceptor from 'src/interceptors/mongoose-class-serializer.interceptor';
import { User, UserDocument } from 'src/schemas/user.schema';
import { LoginDto, VerifyDto } from './user.dto';
import { UserService } from './user.service';

@Controller('/users')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email } = body;

    await this.userService.login(email);
  }

  @Post('verify')
  async verify(@Body() body: VerifyDto): Promise<UserDocument> {
    return await this.userService.verify(body);
  }
}
