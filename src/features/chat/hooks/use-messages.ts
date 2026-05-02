import { useCallback, useEffect, useState } from 'react'

import { getMessages } from '@/entities/chat/api/chat.api'
import type { Message } from '@/entities/chat/domain/message'
import type { UseMessagesProps, UseMessagesReturn } from '../types/use-messages.types'

export function useMessages({ conversationId, userId }: UseMessagesProps): UseMessagesReturn {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  const loadMessages = useCallback(async () => {
    if (!conversationId) {
      clearMessages()

      return
    }

    setLoading(true)

    try {
      const fetchedMessages = await getMessages(conversationId)

      setMessages(fetchedMessages)
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      setLoading(false)
    }
  }, [clearMessages, conversationId])

  useEffect(() => {
    void loadMessages()
  }, [loadMessages])

  const addMessage = useCallback((incomingMessage: Message) => {
    setMessages(previousMessages => {
      const messageExists = previousMessages.some(message => message.id === incomingMessage.id)

      if (messageExists) {
        return previousMessages
      }

      const optimisticMessage = previousMessages.find(
        message =>
          message.status === 'sending' &&
          message.content === incomingMessage.content &&
          message.senderId === incomingMessage.senderId,
      )

      if (optimisticMessage) {
        return previousMessages.map(message =>
          message.id === optimisticMessage.id
            ? {
                ...incomingMessage,
                status: 'sent',
              }
            : message,
        )
      }

      return [
        ...previousMessages,
        {
          ...incomingMessage,
          status: 'sent',
        },
      ]
    })
  }, [])

  const createOptimisticMessage = useCallback(
    (content: string): Message => ({
      id: `temp-${Date.now()}`,
      conversationId: conversationId ?? '',
      senderId: userId,
      content,
      createdAt: new Date().toISOString(),
      type: 'text',
      status: 'sending',
    }),
    [conversationId, userId],
  )

  const addOptimisticMessage = useCallback(
    (content: string) => {
      if (!conversationId) {
        return
      }

      const optimisticMessage = createOptimisticMessage(content)

      setMessages(previousMessages => [...previousMessages, optimisticMessage])
    },
    [conversationId, createOptimisticMessage],
  )

  const markMessageAsRead = useCallback((messageId: string) => {
    setMessages(previousMessages =>
      previousMessages.map(message =>
        message.id === messageId
          ? {
              ...message,
              status: 'read',
            }
          : message,
      ),
    )
  }, [])

  return {
    messages,
    loading,
    addMessage,
    addOptimisticMessage,
    markMessageAsRead,
    reloadMessages: loadMessages,
  }
}
