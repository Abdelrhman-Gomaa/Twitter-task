import { Field, InputType, Int } from "@nestjs/graphql";
import { IsAlpha, IsBoolean, IsEmail, IsNumber, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";

@InputType() //'User',{isAbstract: true}
export class CreateUserDto {
    
    @IsString()
    @IsAlpha()
    @Field()
    readonly username: string;

    @IsString()
    @IsEmail()
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
    @Min(18)
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

    @IsString()    
    @Field()
    imageUrl?: string;

}
