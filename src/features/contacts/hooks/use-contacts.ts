import { useQuery } from '@tanstack/react-query'
import { http } from '@/shared/api/http'

export type Contact = {
  _id: string
  nombre: string
  telefono_e164: string
  avatar: string
  avatarColor: string
  online: boolean
  lastMessage?: string
  lastMessageTime?: string
}

export function useContacts(userId: string) {
  return useQuery<Contact[]>({
    queryKey: ['contacts', userId],

    queryFn: async () => {
      const { data } = await http.get(`/usuarios/${userId}/contactos`)
      return data
    },

    enabled: !!userId,
  })
}
