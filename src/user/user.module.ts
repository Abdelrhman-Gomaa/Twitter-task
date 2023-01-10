import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';
import { JwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProviders } from './users.provider';
import { UserResolver } from './user.resolver';
import { TweetService } from 'src/tweet/tweet.service';
import { TweetProviders } from 'src/tweet/tweet.provider';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JwtConstants.secret, //process.env.JWT_SECERT
      signOptions: {
        expiresIn: '24h',
      }
    })
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserResolver,
    ...UserProviders,
    JwtStrategy,
    UserResolver,
    TweetService,
    ...TweetProviders
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class UserModule {}