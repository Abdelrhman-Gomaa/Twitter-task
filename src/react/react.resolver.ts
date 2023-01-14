import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReactService } from './react.service';
import { React } from './entities/react.entity';
import { CreateReactInput } from './dto/create-react.input';
import { UpdateReactInput } from './dto/update-react.input';

@Resolver(() => React)
export class ReactResolver {
  constructor(private readonly reactService: ReactService) {}

  @Mutation(() => React)
  createReact(@Args('createReactInput') createReactInput: CreateReactInput) {
    return this.reactService.create(createReactInput);
  }

  @Query(() => [React], { name: 'react' })
  findAll() {
    return this.reactService.findAll();
  }

  @Query(() => React, { name: 'react' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reactService.findOne(id);
  }

  @Mutation(() => React)
  updateReact(@Args('updateReactInput') updateReactInput: UpdateReactInput) {
    return this.reactService.update(updateReactInput.id, updateReactInput);
  }

  @Mutation(() => React)
  removeReact(@Args('id', { type: () => Int }) id: number) {
    return this.reactService.remove(id);
  }
}
