import { 
    AutoIncrement, 
    BelongsToMany, 
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
import { UserFollwoer } from "src/user.follwoers/entities/user.follwoer.entity";

@ObjectType()
@Table
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

    @HasMany(() => Tweet,{})
    @Field(type => [Tweet],{nullable: 'items'})
    tweets: Tweet[]

    @BelongsToMany(() => User, () => UserFollwoer)
    followers: User[];

    @BelongsToMany(() => User, () => UserFollwoer)
    following: User[];

    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
}
