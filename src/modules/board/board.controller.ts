import { Controller, Get } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('/boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/')
  async getBoards() {
    return await this.boardService.getBoards();
  }
}
