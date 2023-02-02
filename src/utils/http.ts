import axios, { AxiosError, type AxiosInstance } from 'axios'

import {
  clearAuthLS,
  setAccessTokenToLS,
  getAccessTokenFromLS,
  setUserProfileToLS,
  setRefreshTokenToLS,
  getFreshTokenFromLS
} from './auth'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { AuthRespone, RefreshTokenRespone } from 'src/types/auth.type'
import { ErrorRespone } from 'src/types/utils.type'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getFreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 10, //10s
        'expire-refresh-token': 3600 //1h
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
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = respone.data as AuthRespone
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          setUserProfileToLS(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearAuthLS()
        }
        return respone
      },
      (error: AxiosError) => {
        // Unauthorize (401) has many types.
        // - Wrong Token
        // - No Token
        // - Expired Token

        // If 401 Error
        if (isAxiosUnauthorizedError<ErrorRespone<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || {}
          const { url } = config
          // Type: Expired Token & RequestAPI does not belong to RefreshToken Request => Call Refresh Token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            // Handle Call Request Refresh 2 times
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Handle Request Refresh in 10s for next coming request
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })

            return this.refreshTokenRequest.then((access_token) => {
              // if (config.headers) config.headers.authorization = access_token
              // Means: Continue with previous request
              return this.instance({
                ...config,
                headers: { ...config.headers, authorization: access_token }
              })
            })
          }

          //Type: Wrong Token || No Token || Expired Token but Failed Request RefreshToken => ClearLS
          clearAuthLS()
          this.accessToken = ''
          this.refreshToken = ''
        }
        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenRespone>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLS(access_token)
        this.accessToken = access_token

        return access_token
      })
      .catch((error) => {
        clearAuthLS()
        this.accessToken = ''
        this.refreshToken = ''

        throw error
      })
  }
}

const http = new Http().instance

export default http
