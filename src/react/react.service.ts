import { Injectable } from '@nestjs/common';
import { CreateReactInput } from './dto/create-react.input';
import { UpdateReactInput } from './dto/update-react.input';

@Injectable()
export class ReactService {
  create(createReactInput: CreateReactInput) {
    return 'This action adds a new react';
  }

  findAll() {
    return `This action returns all react`;
  }

  findOne(id: number) {
    return `This action returns a #${id} react`;
  }

  update(id: number, updateReactInput: UpdateReactInput) {
    return `This action updates a #${id} react`;
  }

  remove(id: number) {
    return `This action removes a #${id} react`;
  }
}
