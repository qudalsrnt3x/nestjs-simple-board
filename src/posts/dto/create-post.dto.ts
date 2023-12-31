import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from 'src/users/entities/user.entity';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;
    @IsString()
    @IsNotEmpty()
    readonly content: string;
    
}