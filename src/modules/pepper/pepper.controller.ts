import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { JwtUser } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PepperQueryDto } from './pepper.dto';
import { PepperService } from './pepper.service';

@Controller('pepper')
export class PepperController {
  constructor(private readonly pepperService: PepperService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getPepper(@Req() req, @Query() query: PepperQueryDto) {
    const { _id } = req.user as JwtUser;

    const result = await this.pepperService.getPepper(_id, query.date);

    // console.log(result.map(({ lists }) => lists));
    return result;
  }
}
