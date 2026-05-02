import type { Message } from '@/entities/chat/domain/message'

export interface UseMessagesProps {
  conversationId?: string
  userId: string
}

export interface UseMessagesReturn {
  messages: Message[]
  loading: boolean
  addMessage: (message: Message) => void
  addOptimisticMessage: (content: string) => void
  markMessageAsRead: (messageId: string) => void
  reloadMessages: () => Promise<void>
}
