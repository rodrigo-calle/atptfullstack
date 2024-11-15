import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{
    access_token: string;
  }> {
    const user = await this.usersService.findOne({ username });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = {
      userId: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signInWithId(id: number) {
    const user = await this.usersService.findOne({ id });

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    username: string,
    password: string,
  ): Promise<
    Omit<
      User,
      | 'password'
      | 'clientsAproved'
      | 'clientsUploaded'
      | 'files'
      | 'notificationSentTo'
      | 'notificationsReaded'
      | 'notificationsSentBy'
      | 'medal'
      | 'lastMedal'
      | 'newClientsForRegister'
    >
  > {
    const user = await this.usersService.findOne({ username });
    if (user) {
      throw new ForbiddenException();
    }

    const passWordHash = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({
      username,
      password: passWordHash,
      isAdmin: false,
      files: [],
      clientsRegistered: 0,
      lastMedal: null,
      medals: null,
      newClientsForRegister: 0,
    });

    return newUser;
  }
}
