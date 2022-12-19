import { AuthRespone } from 'src/types/auth.type'
import http from 'src/utils/http'

const authApi = {
  RegisterAccount(body: { email: string; password: string }) {
    return http.post<AuthRespone>('/register', body)
  },
  LoginAccount(body: { email: string; password: string }) {
    return http.post<AuthRespone>('/login', body)
  },
  LogoutAccount() {
    return http.post('/logout')
  }
}

export default authApi
