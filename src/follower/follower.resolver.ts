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
  async findAll() {
    return await this.followerService.findAll();
  }

  @Query(() => Follower)
  async findFollower(@Args('id', { type: () => Int }) id: number) {
    return await this.followerService.findFollower(id);
  }

  @Query(() => Follower)
  async findFollowing(@Args('id', { type: () => Int }) id: number) {
    return await this.followerService.findFollowing(id);
  }

  @Query(() => Follower)
  async findstatus(@Args('id') id: number) {
    return await this.followerService.findstatus(id);
  }

  @Query(() => Follower)
  async findstatusByString(@Args('status') status: string) {
    return await this.followerService.findstatusbystring(status);
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
