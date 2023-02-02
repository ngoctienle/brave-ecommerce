import { AuthRespone } from 'src/types/auth.type'
import http from 'src/utils/http'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'

const authApi = {
  RegisterAccount(body: { email: string; password: string }) {
    return http.post<AuthRespone>(URL_REGISTER, body)
  },
  LoginAccount(body: { email: string; password: string }) {
    return http.post<AuthRespone>(URL_LOGIN, body)
  },
  LogoutAccount() {
    return http.post(URL_LOGOUT)
  }
}

export default authApi
