export interface Conversation {
  conversationId: string
  contactUserId: string
  username: string
  isOnline: boolean
  lastSeen: string | null
  createdAt: string
  lastMessageAt: string | null
}
