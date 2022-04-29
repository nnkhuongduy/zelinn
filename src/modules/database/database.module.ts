import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Board, BoardSchema } from 'src/schemas/board.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

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
      {
        name: Board.name,
        schema: BoardSchema,
      },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: Board.name,
        schema: BoardSchema,
      },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class DatabaseModule {}
