import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtUser } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getNotifications(@Req() req) {
    const { _id } = req.user as JwtUser;

    return await this.notificationService.getNotifications(_id);
  }
}
