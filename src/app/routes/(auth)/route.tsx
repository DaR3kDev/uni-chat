import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '@/app/layout/auth-layout'
import { Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
  component: () => (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
})
