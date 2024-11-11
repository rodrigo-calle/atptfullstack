import { User } from './user';

export enum NotificationType {
  INFO = 'INFO',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
}

export interface Notification {
  date_prop: string | number | Date;
  date_prop: string | number | Date;
  id: number;
  message: string;
  date: Date;
  type: NotificationType;
  readedBy: User;
  sentBy: User;
  sentTo: User;
}
