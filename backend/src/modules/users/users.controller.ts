import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/no-admin')
  findAllNoAdmin(): Promise<User[]> {
    return this.usersService.findAllNoAdmin();
  }

  @UseGuards(AuthGuard)
  @Get('/profile/:id')
  @HttpCode(HttpStatus.OK)
  async findUserProfile(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne({ id });
  }
}
