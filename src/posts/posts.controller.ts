import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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
    create(@Body() data: CreatePostDto) { // @Body(new ValidationPipe())로도 사용가능
        return this.postsService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: UpdatePostDto) {
        return this.postsService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.postsService.deleteById(id);
    }
    
}
