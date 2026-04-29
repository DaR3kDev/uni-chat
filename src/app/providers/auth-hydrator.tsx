import { useEffect } from 'react'
import { authStorage } from '@/entities/user/model/storage/auth-storage'
import { useAuthStore } from '@/entities/user/model/store/auth.store'

export function AuthHydrator() {
  const setFromToken = useAuthStore(s => s.setFromToken)

  useEffect(() => {
    const token = authStorage.getToken()
    setFromToken(token)
  }, [setFromToken])

  return null
}
