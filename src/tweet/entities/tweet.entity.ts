import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PrimaryKey, AutoIncrement, Column, DataType, Table, ForeignKey, Model, HasMany } from 'sequelize-typescript';
import { React } from 'src/react/entities/react.entity';
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

  @HasMany(() => React)
  @Field(type => [React],{nullable: 'items'})
  react: React[]

}
