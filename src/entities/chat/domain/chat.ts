import type { Message } from './message'
import type { ChatParticipant } from './participant'

export interface Chat {
  id: string

  alias: string
  avatar?: string
  avatarColor?: string

  isGroup: boolean

  typing?: boolean
  pinned?: boolean
  muted?: boolean

  lastMessage?: string
  lastMessageAt?: string

  unreadCount: number
  online?: boolean

  category: 'all' | 'personal' | 'work' | 'group'

  messages: Message[]
  participants: ChatParticipant[]
}
