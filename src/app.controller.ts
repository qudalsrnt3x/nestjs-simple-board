import { Controller, Get, Ip, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
    ) {}

  @Get()
  getHello(
    @Ip() ip: string
  ): string {
    console.log(ip);
    console.log(this.configService.get<string>('ENVIRONMENT'));
    return this.appService.getHello();
  }

  @Get('/name')
  getName(@Query('name') name: string): string {
    return `Hello ${name}`;
  }

}
