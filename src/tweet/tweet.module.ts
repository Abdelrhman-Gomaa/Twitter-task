import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetResolver } from './tweet.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { TweetProviders } from './tweet.provider';
import { UserProviders } from 'src/user/users.provider';
import { ReactResolver } from 'src/react/react.resolver';
import { ReactService } from 'src/react/react.service';
import { ReactProviders } from 'src/react/react.provider';

@Module({
  imports:[DatabaseModule],
  providers: [
    TweetResolver, 
    TweetService,
    ...TweetProviders,
    ReactService,
    ...ReactProviders
    //...UserProviders
  ]
})
export class TweetModule {}
