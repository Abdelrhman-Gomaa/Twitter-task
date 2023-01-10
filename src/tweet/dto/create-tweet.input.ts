import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType() //'Tweet',{isAbstract: true}
export class CreateTweetInput {
  
  @IsString()
  @Field()
  readonly text: string;

  @IsNumber()
  @Field(type => Int)
  readonly userId: number;

}
