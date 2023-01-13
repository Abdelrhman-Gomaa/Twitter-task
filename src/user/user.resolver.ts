import { UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, GqlArgumentsHost, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express/multer';
import { JwtAuthGaurd } from './jwt-auth.caurd';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { TweetService } from 'src/tweet/tweet.service';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { User } from './entities/UserEntity';
import { UserService } from './user.service';
import { LoginResponse } from './dto/login.response';
import { FollowerService } from 'src/follower/follower.service';

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


    /*@ResolveField('followers', returns => [User])
    async followers(@Parent() users: User) {
      const { id } = users;
      return this.userService.findUserById(id);
    }
  
    @ResolveField('following', returns => [User])
    async folowing(@Parent() users: User) {
      const { id } = users;
      return this.userService.findUserById(id);
    }*/

    /*@Mutation(returns => Boolean)
    @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
    async imageUpload(@UploadedFile() files: Express.Multer.File){ // @Args('createUserDto') createUserDto: CreateUserDto
        //if (files && files.photo) createUserDto.imageUrl = files.photo[0].secure_url;
        //return new Promise(async (resolver, reject) =>{
        //    files
        //})
        //console.log(file)
        //return await this.userService.register(createUserDto)
        return true

    }*/

    /*@Mutation(() => Boolean)
    async addProfilePic(@Args("picture", () =>)){

    }*/

    /*@Query(returns => [User])
    getUsersByDataLoader(@Args('ids') ids: number[]){
        return this.userService.dataload(ids)
    }*/

    /*@ResolveField('followers', returns => [User])
    async follower(@Parent() follower: User) {
        for(let i = 0; i <follower.followers.length ; i++){
            return this.userService.findfollower(follower.followers[i]);
        }
    }

    @ResolveField('following', returns => [User])
    async following(@Parent() follower: User) {
        for(let i = 0; i <follower.following.length ; i++){
            return this.userService.findfollower(follower.following[i]);
        }   
    }*/

}
