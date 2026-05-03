import { createFileRoute } from '@tanstack/react-router'

import { HomePage } from '@/pages/home/home-page'
import { MainLayout } from '@/app/layout/main-layout'

export const Route = createFileRoute('/')({
  component: () => (
    <MainLayout>
      <HomePage />
    </MainLayout>
  ),
})
