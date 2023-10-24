import { Injectable, NotFoundException, Body, Delete, UnauthorizedException } from '@nestjs/common';
import { Post } from './entity/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ) {}

    async findAll() {
        return this.postRepository.find();
    }

    async findById(id: number) {
        const findPost = await this.getPostById(id);
        if (!findPost) {
            throw new NotFoundException(`Post ${id} not found`);
        }
        return findPost;
    }

    async create(data: CreatePostDto, userInfo) {
        const findUser = await this.userRepository.findOne({
            where: {
                id: userInfo.id
            }
        });
        if (!findUser) {
            throw new NotFoundException(`UserId ${userInfo.id} not found`);
        }
        const createPost = this.postRepository.create({
            title: data.title,
            content: data.content,
            user: findUser
        });
        await this.postRepository.save(createPost);
        return { success: true };
    }

    async update(id: number, data: UpdatePostDto, userId: number) {
        const findPost = await this.getPostById(id);
        if (!findPost) {
            throw new NotFoundException(`Post ${id} not found`);
        }
        if (findPost.userId !== userId) {
            throw new UnauthorizedException();
        }
        return this.postRepository.update(id, {...data});
    }

    async deleteById(id: number, userId: number) {
        const findPost = await this.getPostById(id);
        if (!findPost) {
            throw new NotFoundException(`Post ${id} not found`);
        }
        if (findPost.user.id !== userId) {
            throw new UnauthorizedException();
        }
        this.postRepository.remove(findPost);
        return { success: true };
    }

    async getPostById(id: number) {
        return await this.postRepository.findOneBy({
            id
        });
    }
}

