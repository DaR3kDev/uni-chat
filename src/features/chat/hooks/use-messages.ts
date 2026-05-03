import { useCallback, useEffect, useState } from 'react'
import { getMessages } from '@/entities/chat/api/chat.api'
import type { Message } from '@/entities/chat/domain/message'

interface Props {
  conversationId?: string
  userId: string
}

export function useMessages({ conversationId, userId }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  const mapMessage = useCallback((m: any): Message => {
    return {
      id: m.messageId,
      conversationId: m.conversationId,
      senderId: m.senderId,
      content: m.content,
      fileUrl: m.fileUrl,
      fileName: m.fileName,
      createdAt: m.createdAt,
      type: m.type,
    }
  }, [])

  const loadMessages = useCallback(async () => {
    if (!conversationId) {
      clearMessages()
      return
    }

    setLoading(true)

    try {
      const data = await getMessages(conversationId)
      setMessages(data.map(mapMessage))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [conversationId, clearMessages, mapMessage])

  // ⚡ optimizado sin duplicados + sin re-render innecesario
  const addMessage = useCallback((msg: Message) => {
    setMessages(prev => {
      if (prev.some(m => m.id === msg.id)) return prev

      return [...prev, { ...msg, status: 'sent' }]
    })
  }, [])

  const addOptimisticMessage = useCallback((msg: Partial<Message>) => {
    setMessages(prev => [
      ...prev,
      {
        id: msg.id!,
        conversationId: '',
        senderId: userId,
        content: msg.content,
        createdAt: new Date().toISOString(),
        type: 'TEXT',
      },
    ])
  }, [])

  const addOptimisticFileMessage = useCallback(
    (id: string, fileName: string, type: Message['type']) => {
      setMessages(prev => [
        ...prev,
        {
          id,
          conversationId: '',
          senderId: userId,
          fileName,
          fileUrl: '',
          type,
          createdAt: new Date().toISOString(),
          status: 'sending',
        },
      ])
    },
    [userId],
  )

  const markMessageAsRead = useCallback((messageId: string) => {
    setMessages(prev => prev.map(m => (m.id === messageId ? { ...m, status: 'read' } : m)))
  }, [])

  useEffect(() => {
    void loadMessages()
  }, [loadMessages])

  return {
    messages,
    loading,
    addMessage,
    addOptimisticMessage,
    addOptimisticFileMessage,
    markMessageAsRead,
    reloadMessages: loadMessages,
  }
}
