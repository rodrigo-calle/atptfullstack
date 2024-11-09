import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Client } from '../clients/clients.entity';
import { File } from '../files/files.entity';
import { Notification } from '../notifications/notifications.entity';

export enum Medal {
  MADERA = 'MADERA',
  MADERA_NO_VERIFICADA = 'MADERA_NO_VERIFICADA',
  HIERRO = 'HIERRO',
  HIERRO_NO_VERIFICADA = 'HIERRO_NO_VERIFICADA',
  BRONCE = 'BRONCE',
  BRONCE_NO_VERIFICADA = 'BRONCE_NO_VERIFICADA',
  PLATA = 'PLATA',
  PLATA_NO_VERIFICADA = 'PLATA_NO_VERIFICADA',
  ORO = 'ORO',
  ORO_NO_VERIFICADA = 'ORO_NO_VERIFICADA',
  PLATINIUM = 'PLATINIUM',
  PLATINIUM_NO_VERIFICADA = 'PLATINIUM_NO_VERIFICADA',
  DIAMANTE = 'DIAMANTE',
  DIAMANTE_NO_VERIFICADA = 'DIAMANTE_NO_VERIFICADA',
  INMORTAL = 'INMORTAL',
  INMORTAL_NO_VERIFICADA = 'INMORTAL_NO_VERIFICADA',
  RADIANTE = 'RADIANTE',
  RADIANTE_NO_VERIFICADA = 'RADIANTE_NO_VERIFICADA',
}

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

  @Column({
    nullable: true,
  })
  medals: string;

  @Column({
    nullable: true,
  })
  lastMedal: string;

  @Column({
    type: 'int',
    default: 0,
    nullable: false,
  })
  clientsRegistered: number;

  @Column({
    type: 'int',
    default: 0,
    nullable: false,
  })
  newClientsForRegister: number;

  @OneToMany(() => Notification, (client) => client.readedBy)
  notificationsReaded: Notification[];

  @OneToMany(() => Notification, (client) => client.sentBy)
  notificationsSentBy: Notification[];

  @OneToMany(() => Notification, (client) => client.sentTo)
  notificationSentTo: Notification[];

  @OneToMany(() => Client, (client) => client.aprovedBy)
  clientsAproved: Client[];

  @OneToMany(() => Client, (client) => client.uploadedBy)
  clientsUploaded: Client[];

  @OneToMany(() => File, (file) => file.user)
  files: File[];
}
