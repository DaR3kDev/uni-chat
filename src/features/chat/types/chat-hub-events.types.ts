import type { Message } from '@/entities/chat/domain/message'
import type {
  TypingData,
  MessageDeliveredEvent,
  JoinedConversationEvent,
} from '@/entities/chat/realtime/events'

export interface ChatHubEvents {
  ReceiveMessage: Message
  UserTyping: TypingData
  UserJoined: JoinedConversationEvent
  MessageDelivered: MessageDeliveredEvent
  MessageRead: MessageDeliveredEvent
}
