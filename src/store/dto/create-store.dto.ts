import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateStoreDto {

  @IsString()
  @IsNotEmpty()
  id_user: string

  @IsString()
  @IsOptional()
  slug: string

  @IsString()
  @IsNotEmpty()
  store_name: string

  @IsNumber()
  @IsNotEmpty()
  id_category: number
}