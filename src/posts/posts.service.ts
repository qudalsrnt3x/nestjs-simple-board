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

    private posts: Post[] = [];

    async findAll() {
        return this.postRepository.find();
    }

    async findById(id: number) {
        const findPost = await this.postRepository.findOne({
            where: {
                id
            },
            // relations: {
            //     user: true
            // }
        });
        if (!findPost) {
            throw new NotFoundException(`Post ${id} not found`);
        }
        return findPost;
    }

    create(data: CreatePostDto) {
        return this.postRepository.save(data);
    }

    update(id: number, data: UpdatePostDto) {
        const index = this.getPostId(id);
        if(index > -1) {
            this.posts[index] = {
                ...this.posts[index],
                ...data
            }
        } else {
            throw new NotFoundException(`Post ${id} not found`);
        }
        return this.posts[index];
    }

    deleteById(id: number) {
        const index = this.getPostId(id);
        if(index > -1) {
            this.posts.splice(index, 1);
        } else {
            throw new NotFoundException(`Post ${id} not found`);
        }
        return { success: true };
    }

    getPostId(id: number) {
        return this.posts.findIndex(post => post.id === id);
    }

    getNextId() {
        return this.posts.sort((a, b) => (b.id - a.id))[0].id + 1;
    }
}
