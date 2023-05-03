import { Exclude } from "class-transformer"

export class UserEntity {
  name: string
  email: string
  
  address: string | null
  province: string | null
  city: string | null
  code_pos: number | null
  country: string | null
  phone: string | null
  photo: string | null
  is_seller: boolean | null
    
  @Exclude()
  hash: string

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}