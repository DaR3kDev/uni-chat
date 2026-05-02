import { http } from '@/shared/api/http'

export const sendDirectMessage = async (payload: { conversationId: string; content: string }) => {
  const { data } = await http.post('messages/send', payload)
  return data
}

export const getMessages = async (conversationId: string) => {
  const { data } = await http.get(`messages/conversation/${conversationId}`)
  return data
}
