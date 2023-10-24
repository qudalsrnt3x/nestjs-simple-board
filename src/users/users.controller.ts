import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post()
    signup(@Body() data: CreateUserDto) {
        return this.usersService.createUser(data);
    }

    @Post('login')
    login(@Body() data: LoginUserDto) {
        return this.usersService.login(data);
    }

    me() {

    }

    @Get()
    getUsers() {
        return this.usersService.getAll();
    }
}
