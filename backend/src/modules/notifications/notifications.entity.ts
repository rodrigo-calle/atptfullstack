import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
export enum NotificationType {
  INFO = 'INFO',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  date: Date;

  @Column({
    type: 'enum',
    enum: NotificationType,
    default: NotificationType.INFO,
    nullable: false,
  })
  type: NotificationType;

  @ManyToOne(() => User, (user) => user.notificationsReaded)
  readedBy: User;

  @ManyToOne(() => User, (user) => user.notificationsSentBy)
  sentBy: User;

  @ManyToOne(() => User, (user) => user.notificationSentTo)
  sentTo: User;
}
