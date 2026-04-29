import { create } from 'zustand'

export type User = {
  id: string
  name?: string
  email?: string
}

type AuthState = {
  user: User | null

  setUser: (user: User) => void
  setFromToken: (token: string | null) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,

  setUser: user => set({ user }),

  setFromToken: token => {
    if (!token) return set({ user: null })

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))

      set({
        user: {
          id: payload.sub,
        },
      })
    } catch {
      set({ user: null })
    }
  },

  clear: () => set({ user: null }),
}))
