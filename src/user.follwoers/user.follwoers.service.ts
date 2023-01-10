import { Injectable } from '@nestjs/common';
import { CreateUserFollwoerInput } from './dto/create-user.follwoer.input';
import { UpdateUserFollwoerInput } from './dto/update-user.follwoer.input';

@Injectable()
export class UserFollwoersService {
  create(createUserFollwoerInput: CreateUserFollwoerInput) {
    return 'This action adds a new userFollwoer';
  }

  findAll() {
    return `This action returns all userFollwoers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userFollwoer`;
  }

  update(id: number, updateUserFollwoerInput: UpdateUserFollwoerInput) {
    return `This action updates a #${id} userFollwoer`;
  }

  remove(id: number) {
    return `This action removes a #${id} userFollwoer`;
  }
}
