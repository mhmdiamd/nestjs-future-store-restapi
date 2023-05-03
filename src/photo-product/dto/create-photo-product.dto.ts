import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreatePhotoProductDto {

  @IsNotEmpty()
  @IsString()
  id_product: string

  @IsNotEmpty()
  @IsString()
  photo1: string

  @IsOptional()
  @IsString()
  photo2: string

  @IsOptional()
  @IsString()
  photo3: string

  @IsOptional()
  @IsString()
  photo4: string

}