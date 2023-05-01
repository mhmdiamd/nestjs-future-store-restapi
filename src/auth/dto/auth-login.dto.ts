import { IsEmail, IsString, IsNotEmpty } from "class-validator"

export class AuthLoginDto {

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}