import { useEffect } from 'react'
import { authStorage } from '@/entities/auth/model/storage/auth-storage'
import { useAuthStore } from '@/entities/auth/model/store/auth.store'
import { getMe } from '@/entities/auth/api/auth.api'

export function AuthHydrator() {
  const setUser = useAuthStore(s => s.setUser)
  const clearUser = useAuthStore(s => s.clear)

  useEffect(() => {
    const token = authStorage.getToken()

    if (!token) {
      clearUser()
      return
    }

    const loadUser = async () => {
      try {
        const user = await getMe()
        setUser(user)
      } catch {
        authStorage.clear()
        clearUser()
      }
    }

    loadUser()
  }, [setUser, clearUser])

  return null
}
