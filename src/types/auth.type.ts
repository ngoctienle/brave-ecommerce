import { User } from './user.type'
import { ResponeApi } from './utils.type'

export type AuthRespone = ResponeApi<{
  access_token: string
  expires: string
  user: User
}>
