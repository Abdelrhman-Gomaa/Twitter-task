import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PrimaryKey, AutoIncrement, Column, DataType, Table, ForeignKey, BelongsTo, Model } from 'sequelize-typescript';
import { User } from '../../user/entities/UserEntity';

@Table
@ObjectType()
export class Tweet extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)   
  @Field(type => Int)
  id: number;

  @Column(DataType.STRING)   
  @Field()
  text: string;

  @ForeignKey(() => User)
  @Field(type => Int)
  userId: number;

  /*@BelongsTo(() => User)  
  @Field(type => User)
  user: User;*/
}
