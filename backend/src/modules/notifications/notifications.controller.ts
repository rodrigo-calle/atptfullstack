import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}
  @Get('/admins')
  async findAllSentByUsers() {
    const notifications = await this.notificationsService.findAllSentByUsers();
    return notifications;
  }
}
