import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateFollowerInput {
  
  @IsString()
  @IsAlpha()
  @Field()
  status: string;

  @IsNumber()
  @Field(type => Int)
  userId: number;

  @IsNumber()
  @Field()
  followers_Id: number;

  @IsNumber()
  @Field()
  following_Id: number;
}
