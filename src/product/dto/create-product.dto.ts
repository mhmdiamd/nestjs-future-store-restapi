import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {

  @IsNotEmpty()
  @IsString()
  product_name: string

  @IsNotEmpty()
  @IsNumber()
  @Transform(({value}) => Number(value))
  price: number

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Transform(({value}) => Number(value))
  stock: number
}