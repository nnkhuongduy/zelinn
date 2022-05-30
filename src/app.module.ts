import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './modules/board/board.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ListModule } from './modules/list/list.module';
import { CardModule } from './modules/card/card.module';
import { PepperModule } from './modules/pepper/pepper.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          secure: true,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: '"Zelinn" <noreply@zelinn.pw>',
        },
      }),
    }),
    DatabaseModule,
    AuthModule,
    BoardModule,
    UserModule,
    UploadModule,
    NotificationModule,
    ListModule,
    CardModule,
    PepperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
