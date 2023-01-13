import { 
    AutoIncrement, 
    Column, 
    DataType, 
    HasMany, 
    Model, 
    PrimaryKey, 
    Table, 
    Unique, 
    Validate 
} from "sequelize-typescript";
import * as bcrypt from 'bcrypt'
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Tweet } from "../../tweet/entities/tweet.entity";
import { Follower } from "../../follower/entities/follower.entity";

@Table
@ObjectType()
export class User extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)   
    @Field(type => Int)
    id: number;

    @Unique
    @Column(DataType.STRING)   
    @Field()
    username: string;

    @Validate({isEmail: true})
    @Unique
    @Column(DataType.STRING)   
    @Field()
    email: string;

    @Column(DataType.STRING)   
    @Field()
    salt: string;

    @Column(DataType.STRING)   
    @Field()
    password: string;

    @Column(DataType.INTEGER)
    @Field(type => Int)
    age: number;

    @Column(DataType.STRING)
    @Field()
    location: string;

    @Column(DataType.STRING)   
    @Field()
    phoneNumber: string;

    @Column(DataType.BOOLEAN)   
    @Field()
    isAdmin: boolean;

    @Column(DataType.STRING)   
    @Field()
    nation: string;

    @Column(DataType.STRING)   
    @Field()
    imageUrl?: string;

    @HasMany(() => Tweet,{})
    @Field(type => [Tweet],{nullable: 'items'})
    tweets: Tweet[]

    @HasMany(() => Follower, 'followers_Id')
    @Field(type => [Follower],{nullable: 'items'})
    followers: Follower[]
  
    @HasMany(() => Follower, 'following_Id')
    @Field(type => [Follower],{nullable: 'items'})
    follwing: Follower[]

    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
}
