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

  findAllNoAdmin(): Promise<User[]> {
    return this.usersRepository.find({ where: { isAdmin: false } });
  }

  async findOne(user: {
    id?: number;
    username?: string;
  }): Promise<User | null> {
    if (user.id) {
      const userFound = await this.usersRepository.find({
        where: { id: user.id },
        select: {
          username: true,
          id: true,
          medals: true,
          lastMedal: true,
          isAdmin: true,
          files: {
            id: true,
            status: true,
            fileUrl: true,
            createdAt: true,
            clients: true,
          },
        },
        relations: {
          files: true,
        },
      });

      return userFound[0];
    }

    if (user.username)
      return this.usersRepository.findOneBy({ username: user.username });

    return null;
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    console.log({ user });
    const updatedUser = await this.usersRepository.update(id, user);
    return updatedUser.raw[0];
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
