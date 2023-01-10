import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerResolver } from './follower.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { FollowerProviders } from './follower.provider';

@Module({
  imports:[DatabaseModule],
  providers: [
    FollowerResolver, 
    FollowerService,
    ...FollowerProviders
  ]
})
export class FollowerModule {}
