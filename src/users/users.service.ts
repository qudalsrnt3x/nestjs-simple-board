import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { hash, compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';

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

    async getUserByUsername(username: string) {
        return await this.userRepository.findOneBy({
            username
        });
    }

    async login(data: LoginUserDto) {
        const {username, password} = data;
        
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
