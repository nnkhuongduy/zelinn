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
import { CreateListDto, GetListsDto } from './list.dto';
import { ListService } from './list.service';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getLists(@Query() query: GetListsDto, @Req() req) {
    const { _id } = req.user as JwtUser;

    return await this.listService.getLists(_id, query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createList(@Body() body: CreateListDto, @Req() req) {
    const { _id } = req.user as JwtUser;

    await this.listService.createList(_id, body);
  }
}
