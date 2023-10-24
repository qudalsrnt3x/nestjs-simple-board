import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserInfo } from 'src/decorators/user-info.decorator';
import { userInfo } from 'os';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) {}

    private readonly logger = new Logger(PostsController.name);

    @Get()
    findAll() {
        this.logger.log('findAll');
        return this.postsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.postsService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(
        @Body() data: CreatePostDto,
        @UserInfo() userInfo
    ) { // @Body(new ValidationPipe())로도 사용가능
        if(!userInfo) throw new UnauthorizedException();
        return this.postsService.create(data, userInfo);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id') id: number, 
        @Body() data: UpdatePostDto,
        @UserInfo() userInfo) {
        return this.postsService.update(id, data, userInfo.id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    delete(@Param('id') id: number, @UserInfo() userInfo) {
        return this.postsService.deleteById(id, userInfo.id);
    }
    
}
