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

  async findAllSentByUsers(): Promise<Notification[]> {
    const notifications = await this.notificationsRepository.find({
      where: {
        sentBy: {
          isAdmin: false,
        },
      },
      select: {
        sentBy: {
          id: true,
          username: true,
        },
        readedBy: {
          id: true,
          username: true,
        },
        sentTo: {
          id: true,
        },
      },
      relations: {
        sentBy: true,
        readedBy: true,
        sentTo: true,
      },
    });
    return notifications;
  }

  async finAllSentBySendTo(sentToId: number): Promise<Notification[]> {
    const notifications = await this.notificationsRepository.find({
      where: { sentTo: { id: sentToId } },
      select: {
        sentBy: {
          id: true,
          username: true,
        },
        readedBy: {
          id: true,
          username: true,
        },
        sentTo: {
          id: true,
        },
      },
      relations: {
        sentBy: true,
        readedBy: true,
        sentTo: true,
      },
    });
    return notifications;
  }

  async findAll(): Promise<Notification[]> {
    const notifications = await this.notificationsRepository.find();
    return notifications;
  }
}
