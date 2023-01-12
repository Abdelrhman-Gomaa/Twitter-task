import { Field, ObjectType } from "@nestjs/graphql";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/UserEntity";

@ObjectType()
export class LoginResponse {

    @Field()
    access_Token: string;

    @Field(() => User)
    user: User;

}
