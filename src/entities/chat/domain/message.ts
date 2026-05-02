export type MessageType = 'text' | 'image' | 'voice'
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'sending' | 'error'

export type Message = {
  id: string
  conversationId: string
  senderId: string
  content?: string
  createdAt: string

  type: MessageType
  status: MessageStatus
}
