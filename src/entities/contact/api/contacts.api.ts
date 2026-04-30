import { http } from '@/shared/api/http'
import type { Message, SendMessagePayload } from '@/features/chat/types/messages.types'

export const createContact = async (payload: { alias: string; phone: string }) => {
  const { data } = await http.post(`contacts`, payload)
  return data
}

export const getContacts = async (page: number = 1, pageSize: number = 20, search: string = '') => {
  const { data } = await http.get(`contacts?Page=${page}&PageSize=${pageSize}&Search=${search}`)
  return data
}

export const deleteContact = async (contactId: string) => {
  const { data } = await http.delete(`contacts/${contactId}`)
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
