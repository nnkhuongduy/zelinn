import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtUser } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/jwt.guard';
import {
  CreateListDto,
  DeleteListDto,
  GetListDto,
  GetListsDto,
  UpdateListDto,
} from './list.dto';
import { ListService } from './list.service';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getLists(@Query() query: GetListsDto, @Req() req) {
    const { _id } = req.user as JwtUser;

    const result = await this.listService.getLists(_id, query);

    return result;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createList(@Body() body: CreateListDto, @Req() req) {
    const { _id } = req.user as JwtUser;

    await this.listService.createList(_id, body);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  async getList(@Req() req, @Query() query: GetListDto) {
    const { _id } = req.user as JwtUser;

    return await this.listService.getList(_id, query);
  }

  @Post('update')
  @UseGuards(JwtAuthGuard)
  async updateList(@Req() req, @Body() body: UpdateListDto) {
    const { _id } = req.user as JwtUser;

    return await this.listService.updateList(_id, body);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteList(@Req() req, @Query() query: DeleteListDto) {
    const { _id } = req.user as JwtUser;

    return await this.listService.deleteList(_id, query);
  }
}
