import LoginPage from '@/pages/authentication/login-page'
import { Routes, Route } from 'react-router'
import ChatLayout from '../layout/chat-layout'
import ChatPage from '@/pages/chat/chat-page'

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LoginPage />} />
        <Route path="/chat" element={<ChatLayout />}>
          <Route index element={<ChatPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
