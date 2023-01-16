import { UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Context, Mutation, Parent, Query, ResolveField, ResolveProperty, Resolver, Root } from '@nestjs/graphql';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { JwtAuthGaurd } from './jwt-auth.caurd';
import { Tweet } from '../tweet/entities/tweet.entity';
import { TweetService } from '../tweet/tweet.service';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { User } from './entities/UserEntity';
import { UserService } from './user.service';
import { LoginResponse } from './dto/login.response';
import { FollowerService } from 'src/follower/follower.service';
import { Follower } from '../follower/entities/follower.entity';
import { MyContext } from '../types/myContext';

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly tweetService: TweetService,
        private readonly followerService: FollowerService
    ){}

    // To Register A new User
    @Mutation(returns => User)
    @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
    async register(@Args('createUserDto') createUserDto: CreateUserDto, @UploadedFile() files): Promise<User> {
        if (files && files.photo) createUserDto.imageUrl = files.photo[0].secure_url;
        return await this.userService.register(createUserDto)
    }

    // Login to App
    @Mutation(returns => LoginResponse)
    async login(@Args('loginUserInput') loginUserInput: LoginUserDto){// : Promise<{accessToken: string}>
        return await this.userService.login(loginUserInput)
    }

    // Get All User
    @Query(returns => [User])
    @UseGuards(JwtAuthGaurd)
    getAllUser(): Promise<User[]>{
        return this.userService.findAll()
    }

    // Get One User By Email
    @Query(returns => User)
    @UseGuards(JwtAuthGaurd)
    getOneUser(@Args('email') email: string): Promise<User>{
        return this.userService.findOneUser(email)
    }

    // Add Tweet To Get Methods
    @ResolveField('tweets', returns => [Tweet])
    async posts(@Parent() tweets: Tweet) {
    const { id } = tweets;
    return this.tweetService.findTweet(id);
    }

    /*@ResolveProperty('tweets', returns => [Tweet])
    async tweet(@Root() user: User, @Context() ctx:MyContext): Promise<Tweet[]>{
        return await ctx.tweetLoader.load(user.id)
    }*/

    // Get FOllowers
    @ResolveField('followers', returns => [Follower])
    async getFollowers(@Parent() followers: Follower) {
        const { id } = followers;
        return this.followerService.findFollower(id);
    }
    
    // Get FOllowing
    @ResolveField('follwing', returns => [Follower])
    async getFollwing(@Parent() follwing: Follower) {
        const { id } = follwing; 
        return this.followerService.findFollowing(id);
    }

}
