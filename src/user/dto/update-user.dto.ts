import { Transform } from "class-transformer"
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    email: string
    
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    address: string

    @IsString()
    @IsOptional()
    province: string

    @IsString()
    @IsOptional()
    city: string

    @IsString()
    @IsOptional()
    country: string

    @IsString()
    @IsOptional()
    phone: string

    @IsNumber()
    @IsOptional()
    @Transform(({value}) => Number(value))
    code_pos: number

    @IsBoolean()
    @IsOptional()
    @Transform(({value}) => value == 'true' ? true: false )
    is_seller: boolean
}