import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerResolver } from './follower.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { FollowerProviders } from './follower.provider';
import { UserService } from 'src/user/user.service';
import { UserProviders } from 'src/user/users.provider';
import { JwtStrategy } from '../user/jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[DatabaseModule],
  providers: [
    FollowerResolver, 
    FollowerService,
    ...FollowerProviders,
    UserService,
    ...UserProviders,
    JwtService
  ],
})
export class FollowerModule {}
