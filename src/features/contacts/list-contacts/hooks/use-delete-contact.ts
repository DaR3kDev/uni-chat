import { useMutation } from '@tanstack/react-query'
import { deleteContact } from '@/entities/contact/api/contacts.api'
import { toast } from 'sonner'

export function useDeleteContact() {
  return useMutation({
    mutationFn: (contactId: string) => deleteContact(contactId),

    onSuccess: () => {
      toast.success('Contacto eliminado')
    },
  })
}
