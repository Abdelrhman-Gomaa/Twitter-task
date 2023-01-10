import { Inject, Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { User } from "./entities/userEntity"
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from "./jwt.payload.interface";
import { ForbiddenException, UnauthorizedException } from "@nestjs/common/exceptions";
import { JwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: typeof User,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JwtConstants.secret,
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const user = await this.userRepository.findOne({where: {email: email}});

        if(!user) {
            throw new UnauthorizedException('Invalid Token from jwtStrategy');
        }
        /*if(user.isAdmin === false){
            throw new ForbiddenException(`You Are Forbidden 'Not Admin'`)
        }*/
        return user
    }
}