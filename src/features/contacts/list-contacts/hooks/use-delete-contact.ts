import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteContact } from '@/entities/contact/api/contacts.api'
import { toast } from 'sonner'

export function useDeleteContact() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (contactId: string) => deleteContact(contactId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
      toast.success('Contacto eliminado')
    },
  })
}
