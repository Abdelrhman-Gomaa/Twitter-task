import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetResolver } from './tweet.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { TweetProviders } from './tweet.provider';
import { UserProviders } from 'src/user/users.provider';

@Module({
  imports:[DatabaseModule],
  providers: [
    TweetResolver, 
    TweetService,
    ...TweetProviders,
    //...UserProviders
  ]
})
export class TweetModule {}
