import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createContact } from '../api/contacts.api'
import type { CreateContactPayload } from '../types/contacts.types'

type Params = {
  userId: string
}

export function useCreateContact({ userId }: Params) {
  return useMutation({
    mutationFn: (data: CreateContactPayload) => createContact(userId, data),

    onSuccess: () => {
      toast.success('Contacto agregado')
    },

    onError: () => {
      toast.error('Error al crear contacto')
    },
  })
}
