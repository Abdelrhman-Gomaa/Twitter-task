import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserFollwoerInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
