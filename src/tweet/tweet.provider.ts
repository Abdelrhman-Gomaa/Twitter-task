import { Tweet } from "./entities/tweet.entity";

export const TweetProviders = [
  {
    provide: 'TWEET_REPOSITORY',
    useValue: Tweet,
  }
];
