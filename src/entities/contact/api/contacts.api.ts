import { http } from '@/shared/api/http'
import type {
  CreateContactPayload,
  ContactResponse,
} from '../../../features/contacts/types/contacts.types'
import type { Message, SendMessagePayload } from '@/features/chat/types/messages.types'

export const createContact = async (
  userId: string,
  payload: CreateContactPayload,
): Promise<ContactResponse> => {
  const { data } = await http.post<ContactResponse>(`/usuarios/${userId}/contactos`, payload)

  return data
}

export const getConversation = async (userA: string, userB: string) => {
  const { data } = await http.get<{
    items: Message[]
    next_before_id: string | null
    limit: number
  }>(`/mensajes/conversacion/${userA}/${userB}`)

  return data.items
}

export const sendMessage = async (payload: SendMessagePayload) => {
  const { data } = await http.post('/mensajes', payload)
  return data
}
