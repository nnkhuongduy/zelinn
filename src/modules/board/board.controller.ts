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
  InviteDto,
  PostBoardDto,
  QueryUserDto,
  RemoveMembersDto,
  ResponseInviteDto,
  UpdateBoardDto,
  GetBoardDto,
  LeaveBoardDto,
  DeleteBoardDto,
} from './board.dto';
import { BoardService } from './board.service';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getBoards(@Req() req) {
    const { _id } = req.user as JwtUser;

    return await this.boardService.getBoards(_id);
  }

  @Get('/board')
  @UseGuards(JwtAuthGuard)
  async getBoard(@Query() query: GetBoardDto, @Req() req) {
    const { _id } = req.user as JwtUser;

    return await this.boardService.getBoard(_id, query.id);
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

    await this.boardService.updateBoard(_id, body);
  }

  @Post('members/query')
  @UseGuards(JwtAuthGuard)
  async query(@Body() query: QueryUserDto, @Req() req) {
    const { _id } = req.user as JwtUser;

    return await this.boardService.queryUserToInvite(_id, query);
  }

  @Post('invite')
  @UseGuards(JwtAuthGuard)
  async invite(@Body() body: InviteDto, @Req() req) {
    const { _id } = req.user as JwtUser;

    await this.boardService.invite(_id, body);
  }

  @Post('invite/response')
  @UseGuards(JwtAuthGuard)
  async responseInvitation(@Body() body: ResponseInviteDto, @Req() req) {
    const { _id } = req.user as JwtUser;

    await this.boardService.responseInvitation(_id, body);
  }

  @Post('members/remove')
  @UseGuards(JwtAuthGuard)
  async removeMembers(@Body() body: RemoveMembersDto, @Req() req) {
    const { _id } = req.user as JwtUser;

    await this.boardService.removeMembers(_id, body);
  }

  @Post('leave')
  @UseGuards(JwtAuthGuard)
  async leaveBoard(@Body() body: LeaveBoardDto, @Req() req) {
    const { _id } = req.user as JwtUser;

    await this.boardService.leaveBoard(_id, body);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteBoard(@Req() req, @Query() query: DeleteBoardDto) {
    const { _id } = req.user as JwtUser;

    await this.boardService.deleteBoard(_id, query);
  }
}
