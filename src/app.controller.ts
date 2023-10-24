import { Controller, Get, Ip, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService
    ) {}

  @Get()
  getHello(
    @Ip() ip: string
  ): string {
    console.log(ip);
    console.log(this.configService.get<string>('ENVIRONMENT'));
    return this.appService.getHello();
  }

  @Get('name')
  getName(@Query('name') name: string): string {
    return `Hello ${name}`;
  }

  @UseGuards(LocalAuthGuard) // authStrategy를 통해 return 받은 user 값이 req에 들어가게 된다.
  @Post('login')
  async login(@Request() req) {
     return this.authService.login(req.user);
  }

}
