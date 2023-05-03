export interface IAuthJwt {
  sub: string
  name: string
  is_seller: boolean
  photo: string,

  iat?:number
  exp?:number
}