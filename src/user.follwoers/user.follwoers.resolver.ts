import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserFollwoersService } from './user.follwoers.service';
import { UserFollwoer } from './entities/user.follwoer.entity';
import { CreateUserFollwoerInput } from './dto/create-user.follwoer.input';
import { UpdateUserFollwoerInput } from './dto/update-user.follwoer.input';

@Resolver(() => UserFollwoer)
export class UserFollwoersResolver {
  constructor(private readonly userFollwoersService: UserFollwoersService) {}

  @Mutation(() => UserFollwoer)
  createUserFollwoer(@Args('createUserFollwoerInput') createUserFollwoerInput: CreateUserFollwoerInput) {
    return this.userFollwoersService.create(createUserFollwoerInput);
  }

  @Query(() => [UserFollwoer], { name: 'userFollwoers' })
  findAll() {
    return this.userFollwoersService.findAll();
  }

  @Query(() => UserFollwoer, { name: 'userFollwoer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userFollwoersService.findOne(id);
  }

  @Mutation(() => UserFollwoer)
  updateUserFollwoer(@Args('updateUserFollwoerInput') updateUserFollwoerInput: UpdateUserFollwoerInput) {
    return this.userFollwoersService.update(updateUserFollwoerInput.id, updateUserFollwoerInput);
  }

  @Mutation(() => UserFollwoer)
  removeUserFollwoer(@Args('id', { type: () => Int }) id: number) {
    return this.userFollwoersService.remove(id);
  }
}
