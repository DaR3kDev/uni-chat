export interface Reaction {
  emoji: string
  count: number
}

export interface Chat {
  _id: string
  nombre: string
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
  _id: string
  text: string
  time: string
  fromMe: boolean
  reactions?: Reaction[]
  isVoice?: boolean
  voiceDuration?: string
  replyTo?: string
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
  _id: string
  nombre: string
  telefono_e164: string
  avatar: string
  avatarColor: string
  online: boolean
}

export const currentUser = {
  name: 'Tu',
  avatar: 'T',
  status: 'Disponible',
}
