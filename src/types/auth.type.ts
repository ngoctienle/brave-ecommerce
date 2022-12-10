import { User } from './user.type'
import { SuccessRespone } from './utils.type'

export type AuthRespone = SuccessRespone<{
  access_token: string
  expires: string
  user: User
}>
