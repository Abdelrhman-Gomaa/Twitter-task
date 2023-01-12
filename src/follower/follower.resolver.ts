import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { FollowerService } from './follower.service';
import { Follower } from './entities/follower.entity';
import { CreateFollowerInput } from './dto/create-follower.input';
import { UpdateFollowerInput } from './dto/update-follower.input';
import { User } from 'src/user/entities/UserEntity';
import { UserService } from 'src/user/user.service';

@Resolver(() => Follower)
export class FollowerResolver {
  constructor(
    private readonly followerService: FollowerService,
    private readonly userService: UserService
    ) {}

  @Mutation(() => Follower)
  createFollower(@Args('createFollowerInput') createFollowerInput: CreateFollowerInput) {
    return this.followerService.create(createFollowerInput);
  }

  @Query(() => [Follower], { name: 'follower' })
  findAll() {
    return this.followerService.findAll();
  }

  @ResolveField('followers', returns => [User])
    async posts(@Parent() users: User) {
    const { id } = users;
    return this.userService.findUserById(id);
  }

  @Query(() => Follower, { name: 'findOneFollower' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.followerService.findOne(id);
  }

  @Query(() => Follower, { name: 'findFollowerForUser' })
  findUser(@Args('id', { type: () => Int }) id: number) {
    return this.followerService.findFollowing(id);
  }

  /*

  @Mutation(() => Follower)
  updateFollower(@Args('updateFollowerInput') updateFollowerInput: UpdateFollowerInput) {
    return this.followerService.update(updateFollowerInput.id, updateFollowerInput);
  }

  @Mutation(() => Follower)
  removeFollower(@Args('id', { type: () => Int }) id: number) {
    return this.followerService.remove(id);
  }*/
}
