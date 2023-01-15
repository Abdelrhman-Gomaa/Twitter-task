import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { TweetService } from './tweet.service';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetInput } from './dto/create-tweet.input';
import { React } from 'src/react/entities/react.entity';
import { ReactService } from 'src/react/react.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGaurd } from '../user/jwt-auth.caurd';

@Resolver(() => Tweet)
@UseGuards(JwtAuthGaurd)
export class TweetResolver {
  constructor(
    private readonly tweetService: TweetService,
    private readonly reactService: ReactService
    ){}

  @Mutation(() => Tweet)
  async createTweet(@Args('createTweetInput') createTweetInput: CreateTweetInput) {
    return await this.tweetService.create(createTweetInput);
  }
 
  @Query(returns => [Tweet])
  findAll() {
    return this.tweetService.findAllTweet();
  }

  //@UseGuards(AuthGuard())
  @Query(returns => [Tweet])
  findAllUserTweet(@Args('userId') userId: number) {
    return this.tweetService.findTweet(userId);
  }

  // Get Reacts on One Tweet
  @ResolveField('react', returns => [React])
  async getFollwing(@Parent() react: Tweet) {
      const { id } = react; 
      return this.reactService.findOnetweet(id);
  }

  /*@ResolveField(returns => User)
  user(@Parent() tweet: Tweet): Promise<User>{
    return this.tweetService.findTweetUser(tweet.userId)
  }*/

  /*@Query(() => Tweet, { name: 'tweet' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tweetService.findOne(id);
  }*/

  /*@Mutation(() => Tweet)
  updateTweet(@Args('updateTweetInput') updateTweetInput: UpdateTweetInput) {
    return this.tweetService.update(updateTweetInput.id, updateTweetInput);
  }

  @Mutation(() => Tweet)
  removeTweet(@Args('id', { type: () => Int }) id: number) {
    return this.tweetService.remove(id);
  }*/
}
