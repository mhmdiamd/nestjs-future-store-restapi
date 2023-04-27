import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {

  @IsNotEmpty()
  @IsString()
  id_store: string

  @IsNotEmpty()
  @IsString()
  id_categories: string 

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  stock: number
}