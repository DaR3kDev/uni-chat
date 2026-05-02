import { requireAuth } from '@/shared/lib/guards/auth-guard'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ location }) => {
    requireAuth(location.href)
  },

  component: ProtectedLayout,
})

function ProtectedLayout() {
  return <Outlet />
}
