import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('signin')
  signIn(@Body() signInDto: { username: string; password: string }) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: { username: string; password: string }) {
    return this.authService.signUp(signUpDto.username, signUpDto.password);
  }

  @Public()
  @Post('signinwithid')
  signInWithId(@Body() signInDto: { id: number }) {
    return this.authService.signInWithId(signInDto.id);
  }
}
