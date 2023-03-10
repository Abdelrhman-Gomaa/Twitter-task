import { Inject, Injectable } from '@nestjs/common';
//import { User } from 'src/user/entities/UserEntity';
import { CreateTweetInput } from './dto/create-tweet.input';
import { UpdateTweetInput } from './dto/update-tweet.input';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetService {
constructor(
  @Inject('TWEET_REPOSITORY')
  private readonly tweetRepository: typeof Tweet,
  /*@Inject('USER_REPOSITORY')
  private readonly userRepository: typeof User*/
){}

  async create(createTweetInput: CreateTweetInput): Promise<Tweet> {
    return await this.tweetRepository.create({...createTweetInput})
  }

  async findAllTweet(): Promise<Tweet[]> {
    //return 'gg'
    return await this.tweetRepository.findAll()
  }

  async findTweet(userId:number) : Promise<Tweet[]>{
    return await this.tweetRepository.findAll({where:{userId:userId}})
  }

  async findOneTweet(id:number) : Promise<Tweet>{
    return await this.tweetRepository.findOne({where: {id:id}})
  }

  async findByIds(ids: number[]) : Promise<Tweet[]>{
    const user = this.tweetRepository.findAll({where: {id: ids}})
    return user;
  }

  /*async findTweetUser(id: number): Promise<User>{
    return await this.userRepository.findOne({where:{id: id}})
  }*/

  /*findOne(id: number) {
    return `This action returns a #${id} tweet`;
  }

  update(id: number, updateTweetInput: UpdateTweetInput) {
    return `This action updates a #${id} tweet`;
  }

  remove(id: number) {
    return `This action removes a #${id} tweet`;
  }*/
}
