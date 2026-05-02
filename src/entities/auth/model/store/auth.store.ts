import { create } from 'zustand'
import type { User } from '../../types/auth.types'

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean

  setUser: (user: User) => void
  clear: () => void
  setLoading: (value: boolean) => void
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: user =>
    set({
      user,
      isAuthenticated: true,
      isLoading: false,
    }),

  clear: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),

  setLoading: value =>
    set({
      isLoading: value,
    }),
}))
