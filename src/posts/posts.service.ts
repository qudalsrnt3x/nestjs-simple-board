import { Injectable, NotFoundException, Body, Delete } from '@nestjs/common';
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

    async create(data: CreatePostDto) {
        const findUser = await this.userRepository.findOne({
            where: {
                id: 1
            }
        });
        data.user = findUser;
        return await this.postRepository.save(data);
        
    }

    async update(id: number, data: UpdatePostDto) {
        const findPost = await this.getPostById(id);
        if (!findPost) {
            throw new NotFoundException(`Post ${id} not found`);
        }
        return this.postRepository.update(id, {...data});
    }

    async deleteById(id: number) {
        const findPost = await this.getPostById(id);
        if (!findPost) {
            throw new NotFoundException(`Post ${id} not found`);
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

