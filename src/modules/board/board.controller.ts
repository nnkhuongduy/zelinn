import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtUser } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PostBoardDto, UpdateBoardDto } from './board.dto';
import { BoardService } from './board.service';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getBoards(@Req() req) {
    const { _id } = req.user as JwtUser;

    return await this.boardService.getBoards(_id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBoard(@Body() body: PostBoardDto, @Req() req) {
    const { _id } = req.user as JwtUser;

    await this.boardService.createBoard(_id, body);
  }

  @Post('update')
  @UseGuards(JwtAuthGuard)
  async updateBoard(@Body() body: UpdateBoardDto, @Req() req) {
    const { _id } = req.user as JwtUser;

    return await this.boardService.updateBoard(_id, body);
  }
}
