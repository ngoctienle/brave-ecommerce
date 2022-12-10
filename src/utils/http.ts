import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'

import { clearAccessTokenFromLS, saveAccessTokenToLS, getAccessTokenFromLS } from './auth'
import { AuthRespone } from 'src/types/auth.type'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (respone) => {
        const { url } = respone.config
        if (url === '/login' || url === 'register') {
          this.accessToken = (respone.data as AuthRespone).data.access_token
          saveAccessTokenToLS(this.accessToken)
        } else if (url === '/logout') {
          this.accessToken = ''
          clearAccessTokenFromLS()
        }
        return respone
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message

          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
