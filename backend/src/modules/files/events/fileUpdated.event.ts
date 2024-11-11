import { User } from 'src/modules/users/user.entity';

export class FileUpdatedEvent {
  updatedDate: Date;
  updatedBy: number;
  username?: string;
  status: string;
  totalClients: number;
  id: number;
  user: User;
}
