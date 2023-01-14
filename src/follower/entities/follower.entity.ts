import { ObjectType, Field, Int } from '@nestjs/graphql';
import { 
  AutoIncrement,
  Column, 
  DataType, 
  Default,
  ForeignKey,
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
  
}
