import { useQuery } from '@tanstack/react-query'

import type { Conversation } from '@/entities/conversation/types/conversation.types'
import { getConversations } from '@/entities/conversation/api/conversation.api'

export function useConversations() {
  return useQuery<Conversation[]>({
    queryKey: ['conversations'],

    queryFn: getConversations,
  })
}
