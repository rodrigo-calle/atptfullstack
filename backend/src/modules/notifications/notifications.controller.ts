import { Controller, Get, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}
  @Get('/admins')
  async findAllSentByUsers() {
    const notifications = await this.notificationsService.findAllSentByUsers();
    return notifications;
  }

  @Get('/users/:id')
  async findAllSentToUsers(@Param('id') id: number) {
    const notifications =
      await this.notificationsService.finAllSentBySendTo(id);
    return notifications;
  }

  @Get()
  async findAll() {
    const notifications = await this.notificationsService.findAll();
    return notifications;
  }
}
