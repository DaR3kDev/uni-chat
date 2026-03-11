import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function App() {
  const router = createRouter({
    routeTree,
  })

  return <RouterProvider router={router} />
}
