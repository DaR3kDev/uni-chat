import { useCallback, useEffect, useState } from 'react'

import { getMessages } from '@/entities/chat/api/chat.api'
import type { Message } from '@/entities/chat/domain/message'

interface UseMessagesProps {
  conversationId?: string | null
  userId: string
}

const createBaseMessage = (partial: Partial<Message>, userId: string): Message => ({
  id: partial.id ?? crypto.randomUUID(),
  conversationId: partial.conversationId ?? '',
  senderId: partial.senderId ?? userId,
  content: partial.content ?? '',
  fileUrl: partial.fileUrl ?? '',
  fileName: partial.fileName ?? '',
  createdAt: partial.createdAt ?? new Date().toISOString(),
  type: partial.type ?? 'TEXT',
})

export function useMessages({ conversationId, userId }: UseMessagesProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  const mapMessage = useCallback((message: any): Message => {
    return {
      id: message.messageId ?? '',
      conversationId: message.conversationId ?? '',
      senderId: message.senderId ?? '',
      content: message.content ?? '',
      fileUrl: message.fileUrl ?? '',
      fileName: message.fileName ?? '',
      createdAt: message.createdAt ?? new Date().toISOString(),
      type: message.type ?? 'TEXT',
    }
  }, [])

  const loadMessages = useCallback(async () => {
    if (!conversationId) {
      clearMessages()
      return
    }

    setLoading(true)

    try {
      const response = await getMessages(conversationId)

      if (!Array.isArray(response)) {
        console.warn('Invalid messages response')
        clearMessages()
        return
      }

      const formattedMessages = response.map(mapMessage).filter(message => message.id)

      setMessages(formattedMessages)
    } catch (error) {
      console.error('Error loading messages:', error)

      clearMessages()
    } finally {
      setLoading(false)
    }
  }, [conversationId, clearMessages, mapMessage])

  const addMessage = useCallback((message: Message) => {
    if (!message?.id) return

    setMessages(prevMessages => {
      const alreadyExists = prevMessages.some(currentMessage => currentMessage.id === message.id)

      if (alreadyExists) {
        return prevMessages
      }

      return [...prevMessages, message]
    })
  }, [])

  const addOptimisticMessage = useCallback(
    (message: Partial<Message>) => {
      if (!message?.id) return

      const optimisticMessage = createBaseMessage(
        {
          ...message,
          type: 'TEXT',
        },
        userId,
      )

      setMessages(prevMessages => {
        const alreadyExists = prevMessages.some(
          currentMessage => currentMessage.id === optimisticMessage.id,
        )

        if (alreadyExists) {
          return prevMessages
        }

        return [...prevMessages, optimisticMessage]
      })
    },
    [userId],
  )

  const addOptimisticFileMessage = useCallback(
    (id: string, fileName: string, type: Message['type']) => {
      if (!id || !fileName) return

      const optimisticMessage = createBaseMessage(
        {
          id,
          fileName,
          type,
        },
        userId,
      )

      setMessages(prevMessages => {
        const alreadyExists = prevMessages.some(currentMessage => currentMessage.id === id)

        if (alreadyExists) {
          return prevMessages
        }

        return [...prevMessages, optimisticMessage]
      })
    },
    [userId],
  )

  const removeOptimisticMessage = useCallback((messageId: string) => {
    if (!messageId) return

    setMessages(prevMessages => prevMessages.filter(message => message.id !== messageId))
  }, [])

  const updateMessageStatus = useCallback((messageId: string) => {
    if (!messageId) return

    setMessages(prevMessages =>
      prevMessages.map(message =>
        message.id === messageId
          ? {
              ...message,
            }
          : message,
      ),
    )
  }, [])

  const markMessageAsRead = useCallback(
    (messageId: string) => {
      updateMessageStatus(messageId)
    },
    [updateMessageStatus],
  )

  useEffect(() => {
    void loadMessages()
  }, [loadMessages])

  return {
    messages,
    loading,

    addMessage,
    addOptimisticMessage,
    addOptimisticFileMessage,

    removeOptimisticMessage,

    markMessageAsRead,
    updateMessageStatus,

    reloadMessages: loadMessages,
    clearMessages,
  }
}
