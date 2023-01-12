import { Field, InputType, Int } from "@nestjs/graphql";
import { IsAlpha, IsArray, IsBoolean, IsNumber, IsString, Matches, MaxLength, MinLength, minLength } from "class-validator";
//import { GraphQLUpload } from 'graphql-upload/GraphQLUpload.mjs';

@InputType() //'User',{isAbstract: true}
export class UpdateProfilePicDto {
    
    @Field() //() => GraphQLUpload, { nullable: true }
    file: any;

}