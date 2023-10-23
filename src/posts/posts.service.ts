import { Injectable, NotFoundException, Body, Delete } from '@nestjs/common';
import { Post } from './entity/post.entity';

@Injectable()
export class PostsService {
    private posts: Post[] = [
        {
            id: 1,
            title: 'title1',
            content: 'content1'
        },
        {
            id: 2,
            title: 'title2',
            content: 'content2'
        },
        {
            id: 3,
            title: 'title3',
            content: 'content3'
        },
        {
            id: 4,
            title: 'title4',
            content: 'content4'
        },
    ];

    findAll() {
        return this.posts;
    }

    findById(id: number) {
        const findPost = this.posts.find(post => post.id === id);
        if (!findPost) {
            throw new NotFoundException(`Post ${id} not found`);
        }
        return findPost;
    }

    create(data) {
        const newPost = {
            id: this.getNextId(),
            ...data
        };
        this.posts.push(newPost);
        return newPost;
    }

    update(id: number, data: any) {
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
