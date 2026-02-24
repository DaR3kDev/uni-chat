export interface Reaction {
  emoji: string
  count: number
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

export const initialContacts: Contact[] = [
  {
    id: 'c1',
    name: 'Ana Garcia',
    phone: '+34 612 345 678',
    avatar: 'A',
    avatarColor: 'bg-rose-100 text-rose-600',
    online: true,
  },
  {
    id: 'c2',
    name: 'Carlos Martinez',
    phone: '+34 623 456 789',
    avatar: 'C',
    avatarColor: 'bg-sky-100 text-sky-600',
    online: false,
  },
  {
    id: 'c3',
    name: 'Laura Torres',
    phone: '+34 634 567 890',
    avatar: 'L',
    avatarColor: 'bg-amber-100 text-amber-600',
    online: true,
  },
  {
    id: 'c4',
    name: 'Miguel Lopez',
    phone: '+34 645 678 901',
    avatar: 'M',
    avatarColor: 'bg-emerald-100 text-emerald-600',
    online: false,
  },
  {
    id: 'c5',
    name: 'Sofia Ramirez',
    phone: '+34 656 789 012',
    avatar: 'S',
    avatarColor: 'bg-emerald-100 text-emerald-600',
    online: true,
  },
  {
    id: 'c6',
    name: 'Diego Fernandez',
    phone: '+34 667 890 123',
    avatar: 'D',
    avatarColor: 'bg-indigo-100 text-indigo-600',
    online: false,
  },
  {
    id: 'c7',
    name: 'Valentina Ruiz',
    phone: '+34 678 901 234',
    avatar: 'V',
    avatarColor: 'bg-pink-100 text-pink-600',
    online: true,
  },
  {
    id: 'c8',
    name: 'Andres Moreno',
    phone: '+34 689 012 345',
    avatar: 'AM',
    avatarColor: 'bg-cyan-100 text-cyan-600',
    online: false,
  },
  {
    id: 'c9',
    name: 'Andres Moreno',
    phone: '+34 689 012 345',
    avatar: 'AM',
    avatarColor: 'bg-cyan-100 text-cyan-600',
    online: false,
  },

  {
    id: 'c10',
    name: 'Andres Moreno',
    phone: '+34 689 012 345',
    avatar: 'AM',
    avatarColor: 'bg-cyan-100 text-cyan-600',
    online: false,
  },
  {
    id: 'c11',
    name: 'Andres Moreno',
    phone: '+34 689 012 345',
    avatar: 'AM',
    avatarColor: 'bg-cyan-100 text-cyan-600',
    online: true,
  },
  {
    id: 'c12',
    name: 'Andres Moreno',
    phone: '+34 689 012 345',
    avatar: 'AM',
    avatarColor: 'bg-cyan-100 text-cyan-600',
    online: true,
  },
  {
    id: 'c13',
    name: 'Andres Moreno',
    phone: '+34 689 012 345',
    avatar: 'AM',
    avatarColor: 'bg-cyan-100 text-cyan-600',
    online: true,
  },
]

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
]

export const chats: Chat[] = [
  {
    id: '1',
    name: 'Ana Garcia',
    avatar: 'A',
    avatarColor: 'bg-rose-100 text-rose-600',
    lastMessage: 'Nos vemos a las 8!',
    time: '14:32',
    unread: 2,
    online: true,
    typing: true,
    pinned: true,
    category: 'personal',
    messages: [
      { id: '1a', text: 'Hola! Como estas?', time: '14:20', fromMe: false },
      {
        id: '1b',
        text: 'Bien y tu? Todo bien por aca',
        time: '14:22',
        fromMe: true,
        reactions: [{ emoji: '\u2764\uFE0F', count: 1 }],
      },
      { id: '1c', text: 'Genial! Vamos a cenar hoy?', time: '14:25', fromMe: false },
      { id: '1d', text: 'Claro, me parece perfecto', time: '14:28', fromMe: true },
      { id: '1e', text: 'A que hora quedamos?', time: '14:30', fromMe: true },
      {
        id: '1f',
        text: 'Nos vemos a las 8!',
        time: '14:32',
        fromMe: false,
        reactions: [{ emoji: '\uD83D\uDC4D', count: 1 }],
      },
    ],
  },
  {
    id: '2',
    name: 'Equipo Diseno',
    avatar: 'ED',
    avatarColor: 'bg-indigo-100 text-indigo-600',
    lastMessage: 'El mockup esta listo para review',
    time: '13:45',
    unread: 5,
    online: true,
    pinned: true,
    category: 'group',
    messages: [
      { id: '2a', text: 'Buenos dias equipo', time: '09:00', fromMe: true },
      { id: '2b', text: 'Hola! Ya revise los cambios', time: '09:15', fromMe: false },
      {
        id: '2c',
        text: 'El mockup esta listo para review',
        time: '13:45',
        fromMe: false,
        reactions: [{ emoji: '\uD83D\uDD25', count: 3 }],
      },
    ],
  },
  {
    id: '3',
    name: 'Carlos Martinez',
    avatar: 'C',
    avatarColor: 'bg-sky-100 text-sky-600',
    lastMessage: 'El proyecto va muy bien',
    time: '13:15',
    unread: 0,
    online: false,
    category: 'work',
    messages: [
      { id: '3a', text: 'Como va el proyecto?', time: '13:00', fromMe: true },
      { id: '3b', text: 'El proyecto va muy bien', time: '13:15', fromMe: false },
    ],
  },
  {
    id: '4',
    name: 'Laura Torres',
    avatar: 'L',
    avatarColor: 'bg-amber-100 text-amber-600',
    lastMessage: 'Te envio los archivos manana',
    time: '12:45',
    unread: 1,
    online: true,
    category: 'work',
    messages: [
      { id: '4a', text: 'Necesito los archivos del reporte', time: '12:30', fromMe: true },
      { id: '4b', text: 'Cuales exactamente?', time: '12:35', fromMe: false },
      { id: '4c', text: 'Los del Q4 por favor', time: '12:40', fromMe: true },
      { id: '4d', text: 'Te envio los archivos manana', time: '12:45', fromMe: false },
      { id: '4e', text: '', time: '12:50', fromMe: false, isVoice: true, voiceDuration: '0:42' },
    ],
  },
  {
    id: '5',
    name: 'Miguel Lopez',
    avatar: 'M',
    avatarColor: 'bg-emerald-100 text-emerald-600',
    lastMessage: 'Gracias por la ayuda!',
    time: '11:20',
    unread: 0,
    online: false,
    muted: true,
    category: 'personal',
    messages: [
      { id: '5a', text: 'Puedes ayudarme con algo?', time: '11:00', fromMe: false },
      { id: '5b', text: 'Claro, dime', time: '11:05', fromMe: true },
      { id: '5c', text: 'Necesito revisar el codigo', time: '11:10', fromMe: false },
      {
        id: '5d',
        text: 'Ya lo revise, todo bien',
        time: '11:15',
        fromMe: true,
        reactions: [{ emoji: '\uD83D\uDE4F', count: 1 }],
      },
      { id: '5e', text: 'Gracias por la ayuda!', time: '11:20', fromMe: false },
    ],
  },
  {
    id: '6',
    name: 'Sofia Ramirez',
    avatar: 'S',
    avatarColor: 'bg-emerald-100 text-emerald-600',
    lastMessage: 'Perfecto, nos vemos!',
    time: 'Ayer',
    unread: 0,
    online: true,
    category: 'personal',
    messages: [
      { id: '6a', text: 'Reunion manana a las 10?', time: '16:00', fromMe: false },
      { id: '6b', text: 'Si, perfecto', time: '16:05', fromMe: true },
      { id: '6c', text: 'Perfecto, nos vemos!', time: '16:10', fromMe: false },
    ],
  },
  {
    id: '7',
    name: 'Diego Fernandez',
    avatar: 'D',
    avatarColor: 'bg-indigo-100 text-indigo-600',
    lastMessage: 'Jaja si, fue muy gracioso',
    time: 'Ayer',
    unread: 0,
    online: false,
    category: 'personal',
    messages: [
      { id: '7a', text: 'Viste lo de ayer?', time: '20:00', fromMe: true },
      {
        id: '7b',
        text: 'Jaja si, fue muy gracioso',
        time: '20:05',
        fromMe: false,
        reactions: [{ emoji: '\uD83D\uDE02', count: 2 }],
      },
    ],
  },
]
