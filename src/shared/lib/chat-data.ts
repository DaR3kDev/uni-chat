export interface Reaction {
  emoji: string
  count: number
}

export interface Message {
  _id: string
  text: string
  time: string
  fromMe: boolean
  reactions: { emoji: string; count: number }[]
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

export const stories: Story[] = [
  {
    id: 'own',
    name: 'Tu historia',
    avatar: 'T',
    avatarColor: 'bg-muted',
    seen: false,
    isOwn: true,
  },
  { id: 's1', name: 'Ana', avatar: 'A', avatarColor: 'bg-rose-100 text-rose-600', seen: false },
  { id: 's2', name: 'Carlos', avatar: 'C', avatarColor: 'bg-sky-100 text-sky-600', seen: false },
  { id: 's3', name: 'Laura', avatar: 'L', avatarColor: 'bg-amber-100 text-amber-600', seen: true },
  {
    id: 's4',
    name: 'Sofia',
    avatar: 'S',
    avatarColor: 'bg-emerald-100 text-emerald-600',
    seen: true,
  },
  {
    id: 's5',
    name: 'Diego',
    avatar: 'D',
    avatarColor: 'bg-indigo-100 text-indigo-600',
    seen: true,
  },
  {
    id: 's6',
    name: 'Diego',
    avatar: 'D',
    avatarColor: 'bg-indigo-100 text-indigo-600',
    seen: true,
  },
  {
    id: 's7',
    name: 'Diego',
    avatar: 'D',
    avatarColor: 'bg-indigo-100 text-indigo-600',
    seen: true,
  },
  {
    id: 's8',
    name: 'Diego',
    avatar: 'D',
    avatarColor: 'bg-indigo-100 text-indigo-600',
    seen: true,
  },
]
