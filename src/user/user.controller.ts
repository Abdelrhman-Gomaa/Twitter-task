import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Get()
    async findAll(){
        return await this.userService.findAll()
    }

    @Post('/register')
    async register(@Body(ValidationPipe) createUserDto: CreateUserDto){
        return await this.userService.register(createUserDto)
    }

    /*@Post('/login')
    async login(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<{accessToken: string}>{
        return await this.userService.signIn(loginUserDto)
    }*/
    
}
