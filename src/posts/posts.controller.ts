import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) {}

    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.postsService.findById(id);
    }

    @Post()
    create(@Body() data) {
        return this.postsService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data) {
        return this.postsService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.postsService.deleteById(id);
    }
    
}
