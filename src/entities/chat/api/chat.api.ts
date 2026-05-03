import { http } from '@/shared/api/http'
import type { Message, MessageType } from '../domain/message'

export const sendDirectMessage = async (payload: {
  conversationId: string
  content: string | null
  fileUrl?: string
  fileName?: string
  type?: MessageType
}) => {
  const { data } = await http.post('messages/send', payload)
  console.log('[sendDirectMessage] Response:', data)
  return data
}

export const getMessages = async (conversationId: string): Promise<Message[]> => {
  const { data } = await http.get<Message[]>(`messages/conversation/${conversationId}`)
  return data
}

export const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await http.post('messages/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data.fileUrl
}
