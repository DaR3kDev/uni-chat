export type ChatParticipant = {
  userId: string
  username?: string
  avatar?: string

  isOnline?: boolean
  isAdmin?: boolean

  lastSeen?: string

  isMuted?: boolean
  isPinned?: boolean

  lastReadAt?: string
}
