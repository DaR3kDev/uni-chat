import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createContact } from '../../../entities/contact/api/contacts.api'
import type { ApiError, CreateContactPayload } from '../types/contacts.types'
import type { AxiosError } from 'axios'

type Params = {
  userId: string
}

export function useCreateContact({ userId }: Params) {
  return useMutation({
    mutationFn: (data: CreateContactPayload) => createContact(userId, data),

    onSuccess: () => {
      toast.success('Contacto agregado')
    },

    onError: (error: AxiosError<ApiError>) => {
      const message = error.response?.data?.detail || 'Error al crear contacto'

      toast.error(message)
    },
  })
}
