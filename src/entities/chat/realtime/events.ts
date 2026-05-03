export type TypingData = {
  conversationId: string
  userId: string
  isTyping: boolean
}

export type MessageDeliveredEvent = {
  messageId: string
  conversationId: string
  userId: string
  deliveredAt: string
}

export type MessageReadEvent = {
  messageId: string
  conversationId: string
  userId: string
  readAt: string
}

export type JoinedConversationEvent = {
  conversationId: string
  userId: string
  joinedAt: string
}
