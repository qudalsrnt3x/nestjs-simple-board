import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private readonly UsersService: UsersService
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
}
