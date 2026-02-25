import { Routes, Route } from 'react-router'
import ChatLayout from '@/app/layout/chat-layout'
import LoginPage from '@/pages/authentication/login-page'
import ChatPage from '@/pages/chat/chat-page'
import RegisterPage from '@/pages/authentication/register-page'

export default function MainRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* CHAT */}
      <Route path="/chat" element={<ChatLayout />}>
        <Route index element={<ChatPage />} />
      </Route>
    </Routes>
  )
}
