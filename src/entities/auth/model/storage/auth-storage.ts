import type { User } from '../../types/auth.types'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

const safeJsonParse = <T>(value: string | null): T | null => {
  if (!value) return null

  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

export const authStorage = {
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token)
  },

  getUser: (): User | null => {
    const raw = localStorage.getItem(USER_KEY)
    return safeJsonParse<User>(raw)
  },

  setUser: (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  getUserId: (): string | null => {
    return authStorage.getUser()?.id ?? null
  },

  clear: (): void => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },
}
