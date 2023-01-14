import { Module } from '@nestjs/common';
import { ReactService } from './react.service';
import { ReactResolver } from './react.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { ReactProviders } from './react.provider';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserProviders } from 'src/user/users.provider';
import { TweetService } from 'src/tweet/tweet.service';
import { TweetProviders } from 'src/tweet/tweet.provider';

@Module({
  imports:[DatabaseModule],
  providers: [
    ReactResolver, 
    ReactService,
    ...ReactProviders,
    UserService,
    ...UserProviders,
    TweetService,
    ...TweetProviders,
    JwtService
  ],
})
export class ReactModule {}
