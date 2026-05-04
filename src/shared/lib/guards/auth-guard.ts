import { redirect } from '@tanstack/react-router'

import { useAuthStore } from '@/entities/auth/model/store/auth.store'

export function requireAuth(location: string) {
  const { isAuthenticated, isLoading } = useAuthStore.getState()

  if (isLoading) {
    return
  }

  if (!isAuthenticated) {
    throw redirect({
      to: '/login',
      search: {
        redirect: location,
      },
      replace: true,
    })
  }
}
