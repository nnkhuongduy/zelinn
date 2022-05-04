import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtUser } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateCardDto, GetCardsDto } from './card.dto';
import { CardService } from './card.service';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCard(@Body() body: CreateCardDto, @Req() req) {
    const { _id } = req.user as JwtUser;

    await this.cardService.createCard(_id, body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCards(@Query() query: GetCardsDto, @Req() req) {
    const { _id } = req.user as JwtUser;

    return await this.cardService.getCards(_id, query);
  }
}
