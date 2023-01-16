import * as DataLoader from 'DataLoader'
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { TweetService } from 'src/tweet/tweet.service';

type BatchTweet = (ids: number[]) => Promise<Tweet[]>;

const batchTweets: BatchTweet = async ids => {

    const tweets = await Tweet.findAll({where: {userId:ids}});
  
    const tweetMap: { [key: number]: Tweet } = {};
    tweets.forEach(u => {
        tweetMap[u.id] = u;
    });
  
    return ids.map(id => tweetMap[id]);
    
    //return ids.map((id) => tweets.find(tweet => tweet.id === id));
  };
  
  export const TweetLoader = () => new DataLoader<number, Tweet>(batchTweets);