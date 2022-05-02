import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'code',
    });
  }

  async validate(
    email: string,
    code: string,
  ): Promise<Omit<User, 'verification'>> {
    const user = await this.authService.verify(email, code);

    return user;
  }
}
