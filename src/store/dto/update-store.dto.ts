import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateStoreDto {

  @IsString()
  @IsNotEmpty()
  store_name: string

  @IsNumber()
  @IsNotEmpty()
  id_category: number

  
  @IsNumber()
  @IsOptional()
  description: string
}