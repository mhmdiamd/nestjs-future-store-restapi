import { Exclude } from "class-transformer"

export class UserSerialized {
  name: string
  email: string
  
  @Exclude()
  password: string
  
  address: string | null
  province: string | null
  city: string | null
  code_pos: string | number | null
  country: string | null
  phone: string | null
  photo: string | number | null

  constructor(partial: Partial<UserSerialized>) {
    Object.assign(this, partial);
  }
}