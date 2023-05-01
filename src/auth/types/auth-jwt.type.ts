export interface IAuthJwt {
  id: string
  name: string
  is_seller: boolean
  photo: string,

  sub?:number
  exp:number
}