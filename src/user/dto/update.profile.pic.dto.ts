import { Field, InputType, Int } from "@nestjs/graphql";
import { IsAlpha, IsArray, IsBoolean, IsNumber, IsString, Matches, MaxLength, MinLength, minLength } from "class-validator";

@InputType() //'User',{isAbstract: true}
export class UpdateProfilePicDto {
    
    @IsString()
    @IsAlpha()
    @Field()
    imageUrl: string;

}