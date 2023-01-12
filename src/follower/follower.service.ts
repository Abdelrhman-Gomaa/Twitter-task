import { Inject, Injectable } from '@nestjs/common';
import { CreateFollowerInput } from './dto/create-follower.input';
import { UpdateFollowerInput } from './dto/update-follower.input';
import { Follower } from './entities/follower.entity';

@Injectable()
export class FollowerService {
constructor(
  @Inject('FOLLOWER_REPOSITORY')
  private readonly followerRepository: typeof Follower
){}

  async create(createFollowerInput: CreateFollowerInput) {
    return await this.followerRepository.create({...createFollowerInput});
  }

  async findAll() {
    return await this.followerRepository.findAll();
  }

  async findFollowing(userId:number) {
    return await this.followerRepository.findAll({where:{userId:userId}})
  }

  findOne(id: number) {
    return `This action returns a #${id} follower`;
  }

  update(id: number, updateFollowerInput: UpdateFollowerInput) {
    return `This action updates a #${id} follower`;
  }

  remove(id: number) {
    return `This action removes a #${id} follower`;
  }
}
