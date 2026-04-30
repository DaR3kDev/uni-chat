import { useQuery } from '@tanstack/react-query'
import type { Contact } from '@/entities/contact/types/contact.types'

import { getContacts } from '@/entities/contact/api/contacts.api'

export function useContacts(search: string, page: number = 1, pageSize: number = 20) {
  return useQuery<Contact[]>({
    queryKey: ['contacts', search, page, pageSize],

    queryFn: () => getContacts(page, pageSize, search),
  })
}
