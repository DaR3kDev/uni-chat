import { useCallback, useEffect, useMemo, useState } from 'react'

import { authStorage } from '@/entities/auth/model/storage/auth-storage'

import type { Conversation } from '@/entities/conversation/types/conversation.types'

import { useChatHub } from './use-chat-hub'
import { useMessages } from './use-messages'

interface UseChatControllerProps {
  conversation: Conversation | null
}

export function useChatController({ conversation }: UseChatControllerProps) {
  const [messageInput, setMessageInput] = useState('')

  const userId = authStorage.getUserId()

  const conversationId = conversation?.conversationId

  const { messages, loading, addMessage, addOptimisticMessage, markMessageAsRead } = useMessages({
    conversationId,
    userId: userId!,
  })

  const { invoke } = useChatHub({
    conversationId,

    onReceiveMessage: async incomingMessage => {
      if (!conversationId || incomingMessage.conversationId !== conversationId) {
        return
      }

      addMessage(incomingMessage)

      try {
        await invoke('MessageDelivered', incomingMessage.id, incomingMessage.conversationId)
      } catch (error) {
        console.error(error)
      }
    },

    onMessageRead: data => {
      markMessageAsRead(data.messageId)
    },
  })

  const unreadMessages = useMemo(() => {
    return messages.filter(message => message.senderId !== userId && message.status !== 'read')
  }, [messages, userId])

  useEffect(() => {
    async function markAsRead() {
      if (!conversationId || unreadMessages.length === 0) {
        return
      }

      try {
        await Promise.all(
          unreadMessages.map(message => invoke('MessageRead', message.id, conversationId)),
        )
      } catch (error) {
        console.error(error)
      }
    }

    void markAsRead()
  }, [conversationId, invoke, unreadMessages])

  const sendMessage = useCallback(async () => {
    if (!conversationId || !messageInput.trim()) {
      return
    }

    const content = messageInput.trim()

    setMessageInput('')

    addOptimisticMessage(content)

    try {
      await invoke('SendMessage', conversationId, content)
    } catch (error) {
      console.error(error)
    }
  }, [addOptimisticMessage, conversationId, invoke, messageInput])

  return {
    messages,
    loading,
    messageInput,
    setMessageInput,
    sendMessage,
    userId,
  }
}
