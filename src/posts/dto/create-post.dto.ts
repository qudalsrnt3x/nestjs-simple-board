import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostDto {
    @IsNumber()
    @IsNotEmpty()
    readonly userId: number;
    @IsString()
    @IsNotEmpty()
    readonly title: string;
    @IsString()
    @IsNotEmpty()
    readonly content: string;
    
}