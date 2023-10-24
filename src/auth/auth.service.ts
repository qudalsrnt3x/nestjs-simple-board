import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/user.entity';


@Injectable()
export class AuthService {
    constructor(
        private readonly UsersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    // 로그인 검증 로직
    async validateUser(username: string, password: string) {
        const user = await this.UsersService.getUserByUsername(username);

        // 비밀번호 일치 확인
        if (user) {
            const match = await compare(password, user.password);
            if (match) {
                return user;
            } else {
                return null;
            }
        }

        return null;
    }

    async login(user: User) {
        const payload = {
            username: user.username,
            name: user.name
        };

        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
}
