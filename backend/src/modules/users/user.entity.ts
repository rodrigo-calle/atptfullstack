import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Client } from '../clients/clients.entity';
import { File } from '../files/files.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Client, (client) => client.aprovedBy)
  clientsAproved: Client[];

  @OneToMany(() => Client, (client) => client.uploadedBy)
  clientsUploaded: Client[];

  @OneToMany(() => File, (file) => file.user)
  files: File[];
}
