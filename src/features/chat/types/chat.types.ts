import type { Message } from '@/entities/chat/domain/message'
import type {
  TypingData,
  MessageDeliveredEvent,
  JoinedConversationEvent,
} from '@/entities/chat/realtime/events'

export interface UseChatHubProps {
  onReceiveMessage?: (message: Message) => void
  onTyping?: (data: TypingData) => void
  onJoinedConversation?: (data: JoinedConversationEvent) => void
  onMessageDelivered?: (data: MessageDeliveredEvent) => void
  onMessageRead?: (data: MessageDeliveredEvent) => void
}
