import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { JwtUser } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/jwt.guard';
import {
  CompleteCardDto,
  CreateCardDto,
  GetCardDto,
  GetCardsDto,
  DeleteCardDto,
} from './card.dto';
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

  @Get('card')
  @UseGuards(JwtAuthGuard)
  async getCard(@Req() req, @Query() query: GetCardDto) {
    const { _id } = req.user as JwtUser;

    const result = await this.cardService.getCard(_id, query);

    // console.log(result);

    return result;
  }

  @Post('complete')
  @UseGuards(JwtAuthGuard)
  async completeCard(@Req() req, @Body() body: CompleteCardDto) {
    const { _id } = req.user as JwtUser;

    await this.cardService.completeCard(_id, body);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteCard(@Req() req, @Query() query: DeleteCardDto) {
    const { _id } = req.user as JwtUser;

    await this.cardService.deleteCard(_id, query);
  }
}
