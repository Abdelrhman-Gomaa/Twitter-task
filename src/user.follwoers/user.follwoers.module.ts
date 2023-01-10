import { Module } from '@nestjs/common';
import { UserFollwoersService } from './user.follwoers.service';
import { UserFollwoersResolver } from './user.follwoers.resolver';

@Module({
  providers: [UserFollwoersResolver, UserFollwoersService]
})
export class UserFollwoersModule {}
