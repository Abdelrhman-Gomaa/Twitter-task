import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTweetInput {
  
  @IsString()
  @IsNotEmpty()
  @Field()
  readonly text: string;

  @IsNumber()
  @Field(type => Int)
  readonly userId: number;

}
