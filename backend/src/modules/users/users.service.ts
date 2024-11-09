import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    user: Omit<
      User,
      | 'id'
      | 'clientsAproved'
      | 'clientsUploaded'
      | 'medal'
      | 'notificationsSentBy'
      | 'notificationSentTo'
      | 'notificationsReaded'
      | 'medal'
    >,
  ): Promise<
    Omit<
      User,
      | 'password'
      | 'clientsAproved'
      | 'clientsUploaded'
      | 'files'
      | 'notificationsReaded'
      | 'notificationsSentBy'
      | 'notificationSentTo'
    >
  > {
    const newUser = await this.usersRepository.save(user);
    return {
      clientsRegistered: newUser.clientsRegistered,
      id: newUser.id,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
      medals: null,
      lastMedal: null,
      newClientsForRegister: 0,
    };
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(user: { id?: number; username?: string }): Promise<User | null> {
    if (user.id) return this.usersRepository.findOneBy({ id: user.id });

    if (user.username)
      return this.usersRepository.findOneBy({ username: user.username });

    return null;
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const updatedUser = await this.usersRepository.update(id, user);
    return updatedUser.raw[0];
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
