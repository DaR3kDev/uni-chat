import { createFileRoute, redirect } from '@tanstack/react-router'

import { useAuthStore } from '@/entities/auth/model/store/auth.store'

import { HomePage } from '@/pages/home/home-page'
import { MainLayout } from '@/app/layout/main-layout'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()

    if (isAuthenticated) {
      throw redirect({
        to: '/chat',
        replace: true,
      })
    }

    throw redirect({
      to: '/login',
      replace: true,
    })
  },

  component: () => (
    <MainLayout>
      <HomePage />
    </MainLayout>
  ),
})
