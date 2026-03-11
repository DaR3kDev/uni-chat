import { createFileRoute, Outlet } from '@tanstack/react-router'
import ChatLayout from '@/app/layout/chat-layout'

export const Route = createFileRoute('/chat')({
  component: () => (
    <ChatLayout>
      <Outlet />
    </ChatLayout>
  ),
})
