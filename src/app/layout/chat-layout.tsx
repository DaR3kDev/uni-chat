import { Outlet } from 'react-router'

export default function ChatLayout() {
  return (
    <main className="flex h-dvh w-full overflow-hidden bg-background">
      <Outlet />
    </main>
  )
}
