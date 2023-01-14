import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { TweetModule } from './tweet/tweet.module';
import { FollowerModule } from './follower/follower.module';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ReactModule } from './react/react.module';
import { TweetLoader } from './dataloader/tweet.dataloader';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModule,
    MulterModule.register({
      dest: './uploads',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // code first with auto create schema in path 'src/schema.gql'
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({req, res}) =>({
        req,
        res,
        tweetLoader: TweetLoader(),
      })
    }),
    UserModule,
    TweetModule,
    FollowerModule,
    ReactModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
