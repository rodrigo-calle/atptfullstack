import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notifications.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async create(
    notification: Omit<Notification, 'id' | 'notificationsReaded'>,
  ): Promise<Notification> {
    const newNotification =
      await this.notificationsRepository.save(notification);
    return newNotification;
  }

  async findBySentToId(sentToId: number) {
    const notifications = await this.notificationsRepository.find({
      where: { sentTo: { id: sentToId } },
      select: {
        sentTo: {
          id: true,
          username: true,
          isAdmin: true,
        },
        sentBy: {
          id: true,
          username: true,
          isAdmin: true,
        },
      },
    });
    return notifications;
  }
}
