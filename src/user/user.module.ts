import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { MulterModule } from "@nestjs/platform-express";
import { JwtConstants } from "../../constants";
import { JwtStrategy } from "./jwt.strategy";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { UserProviders } from "./users.provider";
import { DatabaseModule } from "src/database/database.module";
import { TweetService } from "src/tweet/tweet.service";
import { TweetProviders } from "src/tweet/tweet.provider";
import { FollowerService } from "src/follower/follower.service";
import { FollowerProviders } from "src/follower/follower.provider";
import { DataLoaderModule } from "./loader/user.loader";
import { LocalStrategy } from "./local.strategy";
import { UserController } from "./user.controller";

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JwtConstants.secret, //process.env.JWT_SECERT
      signOptions: {
        expiresIn: '24h',
      }
    }),
    MulterModule.register({
      dest: 'src/uploads/',
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
    ...TweetProviders,
    FollowerService,
    ...FollowerProviders,
    LocalStrategy,
    DataLoaderModule,
    /*{
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor
    },*/
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class UserModule {}
