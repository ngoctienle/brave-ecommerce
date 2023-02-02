import { User } from './user.type'
import { SuccessRespone } from './utils.type'

export type AuthRespone = SuccessRespone<{
  access_token: string
  refresh_token: string
  expires: number
  expires_refresh_token: number
  user: User
}>

export type RefreshTokenRespone = SuccessRespone<{
  access_token: string
}>
