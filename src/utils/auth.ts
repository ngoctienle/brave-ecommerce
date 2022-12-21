import { User } from 'src/types/user.type'

export const setAccessTokenToLS = (access_token: string) =>
  localStorage.setItem('access_token', access_token)

export const clearAuthLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const getUserProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setUserProfileToLS = (profile: User) =>
  localStorage.setItem('profile', JSON.stringify(profile))
