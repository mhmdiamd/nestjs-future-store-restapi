import { Transform } from "class-transformer"
import { IsOptional, IsString, IsNumber, Min } from "class-validator"

export class UpdateProductDto {

  @IsOptional()
  @IsString()
  product_name: string

  @IsOptional()
  @IsNumber()
  @Transform(({value}) => Number(value))
  price: number

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({value}) => Number(value))
  stock: number

}