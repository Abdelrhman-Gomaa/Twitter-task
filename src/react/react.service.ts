import { Inject, Injectable } from '@nestjs/common';
import { CreateReactInput } from './dto/create-react.input';
import { React } from './entities/react.entity';

@Injectable()
export class ReactService {
  constructor(
    @Inject('REACT_REPOSITORY')
    private readonly reactRepository: typeof React
  ){}

  async create(createReactInput: CreateReactInput) {
    return await this.reactRepository.create({...createReactInput})
  }

  async findAll() {
    return await this.reactRepository.findAll()
  }

  async findOnetweet(id: number) {
    return await this.reactRepository.findAll({where: {tweet_Id: id}})
  }

  async findOneUser(id: number) {
    return await this.reactRepository.findAll({where: {user_Id: id}})
  }

  /*async update(id: number, updateReactInput: UpdateReactInput) {
    return `This action updates a #${id} react`;
  }

  async remove(id: number) {
    return `This action removes a #${id} react`;
  }*/
}
