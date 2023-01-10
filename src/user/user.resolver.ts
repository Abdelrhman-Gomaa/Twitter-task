import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { TweetService } from 'src/tweet/tweet.service';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { User } from './entities/UserEntity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly tweetService: TweetService
    ){}

    @Mutation(returns => User)
    async register(@Args('createUserDto') createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.register(createUserDto)
    }

    @Mutation(returns => User)
    async login(@Args('loginUserDto') loginUserDto: LoginUserDto){//: Promise<{accessToken: string}>
        return await this.userService.signIn(loginUserDto)
    }

    @Query(returns => [User])
    getAllUser(): Promise<User[]>{
        return this.userService.findAll()
    }

    @ResolveField('tweets', returns => [Tweet])
    async posts(@Parent() tweets: Tweet) {
    const { id } = tweets;
    return this.tweetService.findTweet(id);
    }

    @Query(returns => User)
    getOneUser(@Args('email') email: string): Promise<User>{
        return this.userService.findOneUser(email)
    }

}
