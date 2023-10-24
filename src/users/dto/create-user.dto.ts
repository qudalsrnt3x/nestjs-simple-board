import { IsEmail, IsIn, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name: string;

    // @IsEmail()
    // email: string;

    // @IsPhoneNumber('KR')
    // phone: string;

    // @IsIn(['Female', 'Male'])
    // gender: string;
}