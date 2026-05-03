import { createFileRoute } from '@tanstack/react-router'
import { queryClient } from '@/shared/lib/query-client'
import { getContacts } from '@/entities/contact/api/contacts.api'
import { getConversations } from '@/entities/conversation/api/conversation.api'
import ChatPage from '@/pages/chat/chat-page'

export const Route = createFileRoute('/_protected/chat/')({
  loader: async () => {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['conversations'],
        queryFn: getConversations,
      }),

      queryClient.prefetchQuery({
        queryKey: ['contacts', '', 1, 20],
        queryFn: () => getContacts(1, 20, ''),
      }),
    ])
  },

  component: ChatPage,
})
