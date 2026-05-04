import { useEffect } from 'react'

import { authStorage } from '@/entities/auth/model/storage/auth-storage'
import { useAuthStore } from '@/entities/auth/model/store/auth.store'
import { getMe } from '@/entities/auth/api/auth.api'

export function AuthHydrator() {
  const setUser = useAuthStore(s => s.setUser)
  const clear = useAuthStore(s => s.clear)
  const setLoading = useAuthStore(s => s.setLoading)

  useEffect(() => {
    const token = authStorage.getToken()

    if (!token) {
      clear()
      setLoading(false)
      return
    }

    const hydrate = async () => {
      try {
        const user = await getMe()

        setUser(user)
      } catch {
        authStorage.clear()
        clear()
      } finally {
        setLoading(false)
      }
    }

    hydrate()
  }, [setUser, clear, setLoading])

  return null
}
