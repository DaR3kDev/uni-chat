import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/entities/auth/model/store/auth.store'
import { AuthLayout } from '@/app/layout/auth-layout'

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

  component: () => (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
})
