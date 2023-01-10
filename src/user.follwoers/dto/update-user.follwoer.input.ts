import { CreateUserFollwoerInput } from './create-user.follwoer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserFollwoerInput extends PartialType(CreateUserFollwoerInput) {
  @Field(() => Int)
  id: number;
}
