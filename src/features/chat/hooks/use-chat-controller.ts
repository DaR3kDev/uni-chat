import { useCallback, useRef, useState } from 'react'
import { authStorage } from '@/entities/auth/model/storage/auth-storage'
import type { Conversation } from '@/entities/conversation/types/conversation.types'
import type { MessageType } from '@/entities/chat/domain/message'
import { useChatHub } from './use-chat-hub'
import { useMessages } from './use-messages'
import { uploadFile } from '@/entities/chat/api/chat.api'

interface UseChatControllerProps {
  conversation: Conversation | null
}

const createTempId = () =>
  typeof crypto !== 'undefined' ? crypto.randomUUID() : `temp-${Date.now()}-${Math.random()}`

export function useChatController({ conversation }: UseChatControllerProps) {
  const [messageInput, setMessageInput] = useState('')
  const sendingRef = useRef(false)

  const userId = authStorage.getUserId()
  const conversationId = conversation?.conversationId

  const {
    messages,
    loading,
    addMessage,
    addOptimisticMessage,
    addOptimisticFileMessage,
    markMessageAsRead,
  } = useMessages({
    conversationId,
    userId: userId!,
  })

  const { invoke } = useChatHub({
    conversationId,

    onReceiveTextMessage: msg => {
      if (!conversationId || msg.conversationId !== conversationId) return
      addMessage(msg)
    },

    onReceiveFileMessage: msg => {
      if (!conversationId || msg.conversationId !== conversationId) return
      addMessage(msg)
    },

    onMessageRead: data => markMessageAsRead(data.messageId),
  })

  const sendMessage = useCallback(async () => {
    if (!conversationId || !messageInput.trim()) return
    if (sendingRef.current) return

    sendingRef.current = true

    const content = messageInput.trim()
    setMessageInput('')

    const tempId = createTempId()

    // 👉 optimistic
    addOptimisticMessage({
      id: tempId,
      content,
    })

    try {
      await invoke('SendMessage', conversationId, content, null, null, 'TEXT')
    } catch (err) {
      console.error(err)
    } finally {
      sendingRef.current = false
    }
  }, [conversationId, messageInput, invoke, addOptimisticMessage])

  const sendFile = useCallback(
    async (file: File) => {
      if (!conversationId) return

      const tempId = createTempId()

      const type: MessageType = file.type.startsWith('image/')
        ? 'IMAGE'
        : file.type.startsWith('video/')
          ? 'VIDEO'
          : file.type.startsWith('audio/')
            ? 'AUDIO'
            : 'FILE'

      addOptimisticFileMessage(tempId, file.name, type)

      try {
        const fileUrl = await uploadFile(file)
        if (!fileUrl) throw new Error('upload failed')

        await invoke('SendMessage', conversationId, null, fileUrl, file.name, type)
      } catch (error) {
        console.error(error)
      }
    },
    [conversationId, invoke, addOptimisticFileMessage],
  )

  return {
    messages,
    loading,
    messageInput,
    setMessageInput,
    sendMessage,
    sendFile,
    userId,
  }
}
