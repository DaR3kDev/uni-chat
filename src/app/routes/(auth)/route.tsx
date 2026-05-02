import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/entities/auth/model/store/auth.store'

export const Route = createFileRoute('/(auth)')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()

    if (isAuthenticated) {
      throw redirect({
        to: '/chat',
        replace: true,
      })
    }
  },

  component: AuthLayout,
})

function AuthLayout() {
  return <Outlet />
}
