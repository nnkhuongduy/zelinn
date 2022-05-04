import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

import { UserDocument } from 'src/schemas/user.schema';
import { AuthLoginDto } from './auth.dto';
import { JwtUser } from './auth.interface';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() body: AuthLoginDto) {
    const check = await this.authService.checkUser(body.email);

    if (!check) throw new NotFoundException('User not found!');

    await this.authService.sendVerification(body.email);
  }

  @Post('verify')
  @UseGuards(AuthGuard('local'))
  async verify(@Request() req: any) {
    const { email, _id } = req.user as UserDocument;
    const payload = { email, sub: _id };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async auth(@Request() req: any) {
    const { _id } = req.user as JwtUser;

    return await this.authService.auth(_id);
  }
}
