import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import NotFoundPage from '@/pages/404/404-page'

export const Route = createRootRouteWithContext()({
  component: () => <Outlet />,
  notFoundComponent: () => <NotFoundPage />,
})
