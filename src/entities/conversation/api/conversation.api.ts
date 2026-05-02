import { http } from '@/shared/api/http'

export const createDirectConversation = async (payload: { contactUserId: string }) => {
  const { data } = await http.post('conversations/direct', payload)
  return data
}

export const getConversations = async () => {
  const { data } = await http.get('conversations')
  return data
}
