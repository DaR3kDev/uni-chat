import type { RegisterResponse } from '../types/register.types'

export const authStorage = {
  setToken(token: string) {
    localStorage.setItem('token', token)
  },

  setUser(user: RegisterResponse['user']) {
    localStorage.setItem('user', JSON.stringify(user))
  },
}
