import { Strategy } from 'passport-local'
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "./user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private userService :UserService
    ){
        super()
    }

    async validate(email: string, password: string){
        const user = await this.userService.validation(email,password);
        if(!user) {
            throw new UnauthorizedException();
        }
        return user
    }

}