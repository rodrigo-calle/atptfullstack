import { User } from './user';

export interface Client {
  id: number;
  dni: string;
  name: string;
  lastName: string;
  email: string;
  aprovedBy: User;
  uploadedBy: User;
  file: File;
}
