import { getConversation } from '@/entities/contact/api/contacts.api'
import { useQuery } from '@tanstack/react-query'
import type { Message } from '../types/messages.types'

export function useConversation(userA?: string, userB?: string) {
  return useQuery<Message[]>({
    queryKey: ['conversation', userA, userB],

    queryFn: async () => {
      const data = await getConversation(userA!, userB!)

      return data ?? []
    },

    enabled: !!userA && !!userB,
  })
}
