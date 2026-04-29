import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sendMessage } from '@/entities/contact/api/contacts.api'
import type { SendMessagePayload } from '../types/messages.types'

export function useSendMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: SendMessagePayload) => sendMessage(payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['conversation', variables.remitente_id, variables.destinatario_id],
      })
    },
  })
}
