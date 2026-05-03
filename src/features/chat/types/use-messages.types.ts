import type { Message, MessageType } from '@/entities/chat/domain/message'

export interface UseMessagesProps {
  conversationId?: string
  userId: string
}

export interface UseMessagesReturn {
  messages: Message[]
  loading: boolean
  addMessage: (message: Message) => void
  addOptimisticMessage: (content: string) => void
  addOptimisticFileMessage: (fileUrl: string, fileName: string, type: MessageType) => void
  markMessageAsRead: (messageId: string) => void
  reloadMessages: () => Promise<void>
}
