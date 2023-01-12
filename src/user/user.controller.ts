import { Body, Controller, Get, Post, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
    @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
    async register(@UploadedFile() files, @Body(ValidationPipe) createUserDto: CreateUserDto){
        if (files && files.photo) createUserDto.imageUrl = files.photo[0].secure_url;
        return await this.userService.register(createUserDto)
    }

    /*@Post('/fileupload')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
    async imageUpload(@UploadedFile() file){
        console.log(file)
    }*/

    /*@Post('/login')
    async login(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<{accessToken: string}>{
        return await this.userService.signIn(loginUserDto)
    }*/
    
}
