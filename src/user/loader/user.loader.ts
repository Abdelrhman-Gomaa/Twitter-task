import { MiddlewareConsumer, Module } from "@nestjs/common";
import * as DataLoader from "dataloader";
import { User } from "../entities/UserEntity";

type BatchUser = (ids: string[]) => Promise<User[]>

const batchUsers: BatchUser = async ids => {

    // findByIds(ids)
    const users = await User.findAll({where: {id: ids}})

    const userMap: { [Key: string]: User} = {};

    users.forEach(u => {    
        userMap[u.id] = u
    });

    return ids.map(id => userMap[id]);
}

const userLoader = () => new DataLoader<string, User>(batchUsers)

export class DataLoaderModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(userLoader).forRoutes('*');
    }
}