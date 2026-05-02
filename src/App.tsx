import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import { queryClient } from './shared/lib/query-client'
import { Toaster } from './shared/ui/sonner'
import { AuthHydrator } from './app/providers/auth-hydrator'
import { useAuthStore } from './entities/auth/model/store/auth.store'

export function App() {
  const isLoading = useAuthStore(s => s.isLoading)

  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AuthHydrator />

      {!isLoading && <RouterProvider router={router} />}

      <Toaster />
    </QueryClientProvider>
  )
}
