import type { AuthTokenResponse } from '../types/login.types'

export const authStorage = {
  setToken(token: string) {
    localStorage.setItem('token', token)
  },

  setUser(user: AuthTokenResponse['user']) {
    localStorage.setItem('user', JSON.stringify(user))
  },

  clear() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}
