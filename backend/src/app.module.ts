import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './modules/users/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ClientsModule } from './modules/clients/clients.module';
import { FilesModule } from './modules/files/files.module';
import { Client } from './modules/clients/clients.entity';
import { File } from './modules/files/files.entity';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FileCreatedListener } from './modules/files/listeners/fileCreated.listener';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { UsersModule } from './modules/users/users.module';
import { Notification } from './modules/notifications/notifications.entity';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'password',
      database: 'apt_database',
      entities: [User, Client, File, Notification],
      synchronize: true,
    }),
    AuthModule,
    ClientsModule,
    FilesModule,
    SupabaseModule,
    NotificationsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [FileCreatedListener],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
