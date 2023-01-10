import { Field, InputType, Int } from "@nestjs/graphql";
import { IsAlpha, IsArray, IsBoolean, IsNumber, IsString, Matches, MaxLength, MinLength, minLength } from "class-validator";

@InputType() //'User',{isAbstract: true}
export class CreateUserDto {
    
    @IsString()
    @IsAlpha()
    @Field()
    readonly username: string;

    @IsString()
    @Field()
    readonly email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too week'}
    ) //uppercase , lowercase , number or spezial character
    @Field()
    readonly password: string;

    @IsNumber()
    @Field(type => Int)
    readonly age: number;
    
    @IsString()
    @Field()
    readonly location: string;

    @IsString()    
    @Field()
    readonly phoneNumber: string;

    @IsBoolean()    
    @Field()
    readonly isAdmin: boolean;

    @IsString()    
    @Field()
    readonly nation: string;

}
