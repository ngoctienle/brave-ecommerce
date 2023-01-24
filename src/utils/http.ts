import axios, { AxiosError, type AxiosInstance } from 'axios'

import { clearAuthLS, setAccessTokenToLS, getAccessTokenFromLS, setUserProfileToLS } from './auth'
import { AuthRespone } from 'src/types/auth.type'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import paths from 'src/constants/paths'

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
        if (url === paths.login || url === paths.register) {
          const data = respone.data as AuthRespone
          this.accessToken = data.data.access_token
          setAccessTokenToLS(this.accessToken)
          setUserProfileToLS(data.data.user)
        } else if (url === paths.logout) {
          this.accessToken = ''
          clearAuthLS()
        }
        return respone
      },
      function (error: AxiosError) {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearAuthLS()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
