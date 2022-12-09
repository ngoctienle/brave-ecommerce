import { AuthRespone } from 'src/types/auth.type'
import http from 'src/utils/http'

export const RegisterAccount = (body: { email: string; password: string }) => http.post<AuthRespone>('/register', body)

export const LoginAccount = (body: { email: string; password: string }) => http.post<AuthRespone>('/login', body)

export const LogoutAccout = () => http.post('/logout')
