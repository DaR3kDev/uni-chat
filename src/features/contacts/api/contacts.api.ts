import { http } from '@/shared/api/http'
import type { CreateContactPayload, ContactResponse } from '../types/contacts.types'

export const createContact = async (
  userId: string,
  payload: CreateContactPayload,
): Promise<ContactResponse> => {
  const { data } = await http.post<ContactResponse>(`/usuarios/${userId}/contactos`, payload)

  return data
}
