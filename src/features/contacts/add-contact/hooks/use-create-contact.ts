import { toast } from 'sonner'
import type { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { createContact } from '@/entities/contact/api/contacts.api'
import type { ApiError } from '@/shared/types/api-error'

export function useCreateContact() {
  return useMutation<unknown, AxiosError<ApiError>, { alias: string; phone: string }>({
    mutationFn: data => createContact(data),

    onSuccess: () => {
      toast.success('Contacto agregado')
    },

    onError: error => {
      const message = error.response?.data?.detail || 'Error al crear contacto'

      toast.error(message)
    },
  })
}
