export interface Reaction {
  emoji: string
  count: number
}

export interface ChatSidebarProps {
  chats: Chat[]
  contacts: Contact[]
  activeChatId: string | null
  onSelectChat: (chatId: string) => void
  onAddContact: (name: string, phone: string) => void
  onStartChat: (contact: Contact) => void
  onDeleteChat: (chatId: string) => void
  onTogglePin: (chatId: string) => void
  onToggleMute: (chatId: string) => void
  onDeleteContact: (contactId: string) => void
}

export interface Chat {
  id: string
  name: string
  avatar: string
  avatarColor: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  typing?: boolean
  pinned?: boolean
  muted?: boolean
  messages: Message[]
  category: 'all' | 'personal' | 'work' | 'group'
}

export interface Message {
  id: string
  text: string
  time: string
  fromMe: boolean
  reactions?: Reaction[]
  isVoice?: boolean
  voiceDuration?: string
  replyTo?: string
}

export interface Chat {
  id: string
  name: string
  avatar: string
  avatarColor: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  typing?: boolean
  pinned?: boolean
  muted?: boolean
  messages: Message[]
  category: 'all' | 'personal' | 'work' | 'group'
}

export interface Story {
  id: string
  name: string
  avatar: string
  avatarColor: string
  seen: boolean
  isOwn?: boolean
}

export interface Contact {
  id: string
  name: string
  phone: string
  avatar: string
  avatarColor: string
  online: boolean
}

export const currentUser = {
  name: 'Tu',
  avatar: 'T',
  status: 'Disponible',
}
