import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './shared/lib/query-client'
import { Toaster } from './shared/ui/sonner'
import { AuthHydrator } from './app/providers/auth-hydrator'

export function App() {
  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AuthHydrator />
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  )
}
