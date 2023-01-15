import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Op } from 'sequelize';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { User } from './entities/UserEntity';
import * as bcrypt from 'bcrypt'
import { JwtPayload } from './jwt.payload.interface';
import * as DataLoader from "dataloader";

@Injectable()
export class UserService {
       
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: typeof User,
        private readonly jwtService: JwtService,
    ){}

    private readonly dataloader = new DataLoader<number, User>(keys => this.getMany(Array.from(keys)));
    private async getMany(ids: number[]) {
        return await this.userRepository.findAll({where: {id: ids}});
    }
    async dataload(ids: number[]){
        return this.dataloader.loadMany(ids)
    }

    async findAll() : Promise<User[]>{
        const user = this.userRepository.findAll()
        return user;
    }

    async findOneUser(email: string) : Promise<User>{
        const user = this.userRepository.findOne({where: {email: email}})
        return user;
    }

    async findUserById(id: number) : Promise<User>{
        const user = this.userRepository.findOne({where: {id: id}})
        return user;
    }

    async findByIds(ids: number[]) : Promise<User[]>{
        const user = this.userRepository.findAll({where: {id: ids}})
        return user;
    }

    async register(createUserDto: CreateUserDto): Promise<User>{
        const existUser = await this.userRepository.findOne({
            where: {
                [Op.or]: [{ username: createUserDto.username }, { email: createUserDto.email }]
            }
        })
        if(existUser) throw new ConflictException('username or email already exist')

        const salt = await bcrypt.genSalt()
        const password = createUserDto.password
        const hashPassword = await bcrypt.hash(password, salt)

        try{
            return await this.userRepository.create({
                username: createUserDto.username,
                email: createUserDto.email,
                salt: salt,
                password: hashPassword,
                isAdmin: createUserDto.isAdmin,
                nation: createUserDto.nation,
                phoneNumber: createUserDto.phoneNumber
            })
        }catch(error){
            console.log(error.message)
        }
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.validationUserPassword(loginUserDto)
        if(!user) {
            throw new UnauthorizedException('Invalid Credentials')
        }

        const payload: JwtPayload = { email: user.email , isAdmin: user.isAdmin }
        const accessToken = await this.jwtService.sign(payload)
        //const aa = await this.jwtService.verify(accessToken)
        console.log(accessToken)
        //return { accessToken }
        return {
            access_Token: accessToken,
            user: user
        }
    }

    async validationUserPassword(loginUserDto: LoginUserDto): Promise<any>{
        const user = await this.userRepository.findOne({where: {email: loginUserDto.email}})
        if(user){
            if(await user.validatePassword(loginUserDto.password)){
                const uservalidate = {
                    email: user.email,
                    isAdmin: user.isAdmin,
                    password: user.password
                }
                return uservalidate;
            }else{
                throw new UnauthorizedException('Invalid Password')
            }
        }else{
            return null;
        }
    }
    
    async validation(email: string, password: string): Promise<any>{
        const user = await this.findOneUser(email)
        if(user){
            if(await user.validatePassword(password)){
                const {password, ...result} = user
                return result;
            }else{
                throw new UnauthorizedException('Invalid Password')
            }
        }else{
            return null;
        }
    }

}
