import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Post } from 'src/posts/entity/post.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, compare } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async createUser(data: CreateUserDto) {
        const {username, password, name} = data;

        
        return this.userRepository.save({
            username,
            name,
            password: await this.encryptPassword(password)
        });
    }

    async encryptPassword(password: string) {
        const DEFAULT_SALT = 11;
        return hash(password, DEFAULT_SALT);
    }

    async login(data: LoginUserDto) {
        const {username, password} = data;

        // 유저 존재 여부 확인
        const findUser = await this.userRepository.findOneBy({
            username
        });
        if (!findUser) {
            throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
        }
        // 비밀번호 일치 확인
        const match = await compare(password, findUser.password);
        if (!match) {
            throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
        }
        
        return findUser;
    }

    async getAll() {
        const qb = this.userRepository.createQueryBuilder();

    qb.addSelect((subQuery) => {
      return subQuery
        .select('count(id)')
        .from(Post, 'Post')
        .where('Post.userId = User.id');
    }, 'User_postCount');

    return qb.getMany();
    }
}
