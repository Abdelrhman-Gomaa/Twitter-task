import { Injectable } from '@nestjs/common';
import { CreateFollowerInput } from './dto/create-follower.input';
import { UpdateFollowerInput } from './dto/update-follower.input';

@Injectable()
export class FollowerService {
  create(createFollowerInput: CreateFollowerInput) {
    return 'This action adds a new follower';
  }

  findAll() {
    return `This action returns all follower`;
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
