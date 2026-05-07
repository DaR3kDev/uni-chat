import type { Message } from '@/entities/chat/domain/message'
import type {
  TypingData,
  MessageDeliveredEvent,
  JoinedConversationEvent,
  MessageReadEvent,
} from '@/entities/chat/realtime/events'

export interface ChatHubEvents {
  ReceiveTextMessage: Message
  ReceiveFileMessage: Message
  UserTyping: TypingData
  JoinedConversation: JoinedConversationEvent
  MessageDelivered: MessageDeliveredEvent
  MessageRead: MessageReadEvent
}
