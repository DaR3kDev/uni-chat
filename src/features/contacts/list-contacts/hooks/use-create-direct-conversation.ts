import { toast } from 'sonner'
import type { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import type { ApiError } from '@/shared/types/api-error'
import { createDirectConversation } from '@/entities/conversation/api/conversation.api'

export function useCreateDirectConversation() {
  return useMutation<unknown, AxiosError<ApiError>, { contactUserId: string }>({
    mutationFn: async payload => await createDirectConversation(payload),

    onSuccess: () => {
      toast.success('Conversación creada')
    },

    onError: error => {
      const message = error.response?.data?.Message ?? 'Error al crear conversación'

      toast.error(message)
    },
  })
}
