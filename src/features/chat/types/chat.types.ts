import type { Message } from '@/entities/chat/domain/message'
import type {
  TypingData,
  MessageDeliveredEvent,
  JoinedConversationEvent,
  MessageReadEvent,
} from '@/entities/chat/realtime/events'

export interface UseChatHubProps {
  onReceiveTextMessage?: (message: Message) => void
  onReceiveFileMessage?: (message: Message) => void
  onTyping?: (data: TypingData) => void
  onJoinedConversation?: (data: JoinedConversationEvent) => void
  onMessageDelivered?: (data: MessageDeliveredEvent) => void
  onMessageRead?: (data: MessageReadEvent) => void
}
