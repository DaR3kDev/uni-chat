import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { AuthLayout } from '@/app/layout/auth-layout'
import { authStorage } from '@/entities/auth/model/storage/auth-storage'

export const Route = createFileRoute('/(auth)')({
  beforeLoad: () => {
    const token = authStorage.getToken()

    if (token) {
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
