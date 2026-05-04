import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'

import { routeTree } from './routeTree.gen'
import { queryClient } from './shared/lib/query-client'

import { Toaster } from './shared/ui/sonner'

import { AuthHydrator } from './app/providers/auth-hydrator'

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthHydrator />

      <RouterProvider router={router} />

      <Toaster />
    </QueryClientProvider>
  )
}
