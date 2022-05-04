import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Board, BoardSchema } from 'src/schemas/board.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import {
  Notification,
  NotificationSchema,
} from 'src/schemas/notification.schema';
import { Invitation, InvitationSchema } from 'src/schemas/invitation.schema';
import { List, ListSchema } from 'src/schemas/list.schema';
import { Card, CardSchema } from 'src/schemas/card.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: Board.name,
        schema: BoardSchema,
      },
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
      {
        name: Invitation.name,
        schema: InvitationSchema,
      },
      {
        name: List.name,
        schema: ListSchema,
      },
      {
        name: Card.name,
        schema: CardSchema,
      },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: Board.name,
        schema: BoardSchema,
      },
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
      {
        name: Invitation.name,
        schema: InvitationSchema,
      },
      {
        name: List.name,
        schema: ListSchema,
      },
      {
        name: Card.name,
        schema: CardSchema,
      },
    ]),
  ],
})
export class DatabaseModule {}
