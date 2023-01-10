import { ObjectType, Field, Int } from '@nestjs/graphql';
import { 
  AutoIncrement, 
  BelongsToMany, 
  Column, 
  DataType, 
  Default, 
  HasMany, 
  Model, 
  PrimaryKey, 
  Table 
} from 'sequelize-typescript';
import { User } from 'src/user/entities/UserEntity';


@Table
@ObjectType()
export class UserFollwoer extends Model{
  
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)   
  @Field(type => Int)
  id: number;

  /*@ForeignKey(() => User)
  @Column
  @Field()
  followerId: number

  @ForeignKey(() => User)
  @Column
  @Field()
  followingId: number*/

  //@BelongsToMany(() => User,(u: User) => u.follwoers)
  @HasMany(() => User, 'followers_Id')
  @Field()
  followers: User[]

  @HasMany(() => User, 'following_Id')
  @Field()
  follwing: User[]
  
  @Column(DataType.ENUM('blocked', 'pending', 'accepted'))
  @Default('pending')   
  @Field()
  states: string;

  /*
  states: {
    type: DataTypes.ENUM,
    values: ['active', 'pending', 'deleted']
  }*/
}
