import { ObjectType, Field, Int } from '@nestjs/graphql';
import { 
  AutoIncrement, 
  BelongsTo, 
  BelongsToMany, 
  Column, 
  DataType, 
  Default,
  ForeignKey,
  HasMany,
  Model, 
  PrimaryKey, 
  Table 
} from 'sequelize-typescript';
import { User } from 'src/user/entities/UserEntity';

enum status {
  blocked= 'blocked',
  pending= 'pending',
  accepted= 'accepted'
}
@Table
@ObjectType()
export class Follower extends Model{

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)   
  @Field(type => Int)
  id: number;

  @Default('pending')   
  @Column(DataType.STRING)
  @Field()
  status: status;

  @ForeignKey(() => User)
  @Field(type => Int)
  followers_Id: number;

  @ForeignKey(() => User)
  @Field(type => Int)
  following_Id: number;

  /*@BelongsTo(() => User, {})
  @Field(type => [User],{nullable: 'items'})
  followers: User[];

  @BelongsTo(() => User, {})
  @Field(type => [User],{nullable: 'items'})
  following: User[];*/
  
}
