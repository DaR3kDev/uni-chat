export type MessageType = 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO' | 'FILE'

export type Message = {
  id: string
  conversationId: string
  senderId: string
  content?: string
  fileUrl?: string
  fileName?: string
  createdAt: string
  type: MessageType
}
