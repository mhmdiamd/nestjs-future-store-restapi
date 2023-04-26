import { IsEmail, IsString, IsNotEmpty } from "class-validator"

export class AuthRegisterDto {

  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}