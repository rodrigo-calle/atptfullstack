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
    const { username, password } = signInDto;
    const response = this.authService.signIn(username, password);

    if (!response) {
      return null;
    }

    return response;
  }

  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: { username: string; password: string }) {
    const response = this.authService.signUp(
      signUpDto.username,
      signUpDto.password,
    );

    if (!response) {
      return null;
    }

    return response;
  }

  @Public()
  @Post('signinwithid')
  signInWithId(@Body() signInDto: { id: number }) {
    const response = this.authService.signInWithId(signInDto.id);
    if (!response) {
      return null;
    }
    return response;
  }
}
