import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ReactService } from './react.service';
import { React } from './entities/react.entity';
import { CreateReactInput } from './dto/create-react.input';
import { User } from 'src/user/entities/UserEntity';
import { UserService } from 'src/user/user.service';
import { TweetService } from 'src/tweet/tweet.service';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGaurd } from '../user/jwt-auth.caurd';

@Resolver(() => React)
@UseGuards(JwtAuthGaurd)
export class ReactResolver {
  constructor(
    private readonly reactService: ReactService,
    private readonly userService: UserService,
    private readonly tweetService: TweetService
    ) {}

  @Mutation(() => React)
  createReact(@Args('createReactInput') createReactInput: CreateReactInput) {
    return this.reactService.create(createReactInput);
  }

  @Query(() => [React], { name: 'FindAllReact' })
  findAll() {
    return this.reactService.findAll();
  }

  @Query(() => [React], { name: 'FindOneTweet' })
  findOnwTweet(@Args('id', { type: () => Int }) id: number) {
    return this.reactService.findOnetweet(id);
  }

  @Query(() => [React], { name: 'FindOneUser' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reactService.findOneUser(id);
  }

  @ResolveField('user_Id', returns => User)
  async getFollowing(@Parent() user: React) {
    const { user_Id } = user;
    return await this.userService.findUserById(user_Id); 
  }

  @ResolveField('tweet_Id', returns => Tweet)
  async getFollower(@Parent() tweet: React) {
    const { tweet_Id } = tweet;
    return await this.tweetService.findOneTweet(tweet_Id);
  }

  /*@Mutation(() => React)
  updateReact(@Args('updateReactInput') updateReactInput: UpdateReactInput) {
    return this.reactService.update(updateReactInput.id, updateReactInput);
  }

  @Mutation(() => React)
  removeReact(@Args('id', { type: () => Int }) id: number) {
    return this.reactService.remove(id);
  }*/
}
