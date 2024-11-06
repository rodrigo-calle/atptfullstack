import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { File } from '../files/files.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  dni: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @ManyToOne(() => User, (user) => user.clientsAproved)
  aprovedBy: User;

  @ManyToOne(() => User, (user) => user.clientsUploaded)
  uploadedBy: User;

  @ManyToOne(() => File, (file) => file.clients)
  files: File;
}
