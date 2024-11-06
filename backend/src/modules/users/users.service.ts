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

  async create(user: Omit<User, 'id'>): Promise<Omit<User, 'password'>> {
    const newUser = await this.usersRepository.save(user);
    return {
      id: newUser.id,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
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

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
