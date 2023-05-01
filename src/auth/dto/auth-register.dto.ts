import { IsEmail, IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumber } from "class-validator"

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

  @IsString()
  @IsOptional()
  is_seller: boolean

  @IsString()
  @IsOptional()
  store_name: string

  @IsOptional()
  id_category: String
}