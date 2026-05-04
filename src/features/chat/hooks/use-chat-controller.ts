import { useCallback, useMemo, useRef, useState } from 'react'

import { uploadFile } from '@/entities/chat/api/chat.api'
import type { MessageType } from '@/entities/chat/domain/message'
import { authStorage } from '@/entities/auth/model/storage/auth-storage'
import type { Conversation } from '@/entities/conversation/types/conversation.types'

import { useChatHub } from './use-chat-hub'
import { useMessages } from './use-messages'

interface UseChatControllerProps {
  conversation: Conversation | null
}

const MAX_MESSAGE_LENGTH = 2000

const createTempId = () =>
  typeof crypto !== 'undefined' ? crypto.randomUUID() : `temp-${Date.now()}-${Math.random()}`

const getFileType = (file: File): MessageType => {
  if (file.type.startsWith('image/')) return 'IMAGE'
  if (file.type.startsWith('video/')) return 'VIDEO'
  if (file.type.startsWith('audio/')) return 'AUDIO'

  return 'FILE'
}

export function useChatController({ conversation }: UseChatControllerProps) {
  const [messageInput, setMessageInput] = useState('')

  const sendingMessageRef = useRef(false)
  const sendingFileRef = useRef(false)

  const userId = authStorage.getUserId()

  const conversationId = useMemo(() => conversation?.conversationId ?? null, [conversation])

  const {
    messages,
    loading,
    addMessage,
    addOptimisticMessage,
    addOptimisticFileMessage,
    markMessageAsRead,
  } = useMessages({
    conversationId: conversationId ?? '',
    userId: userId ?? '',
  })

  const handleIncomingMessage = useCallback(
    (msg: { conversationId: string; senderId: string }) => {
      if (!conversationId) return

      if (msg.conversationId !== conversationId) return

      // Evita duplicados del propio usuario
      if (msg.senderId === userId) return

      addMessage(msg as never)
    },
    [conversationId, userId, addMessage],
  )

  const { invoke } = useChatHub({
    conversationId: conversationId ?? '',

    onReceiveTextMessage: handleIncomingMessage,

    onReceiveFileMessage: handleIncomingMessage,

    onMessageRead: data => {
      if (!data?.messageId) return

      markMessageAsRead(data.messageId)
    },
  })

  const sendMessage = useCallback(async () => {
    const content = messageInput.trim()

    if (!userId) return
    if (!conversationId) return
    if (!content) return

    if (content.length > MAX_MESSAGE_LENGTH) {
      console.warn('Message exceeds maximum allowed length')
      return
    }

    if (sendingMessageRef.current) return

    sendingMessageRef.current = true

    const tempId = createTempId()

    setMessageInput('')

    addOptimisticMessage({
      id: tempId,
      content,
    })

    try {
      await invoke('SendMessage', conversationId, content, null, null, 'TEXT')
    } catch (error) {
      console.error('Error sending message:', error)

      // Opcional:
      // removeOptimisticMessage(tempId)
    } finally {
      sendingMessageRef.current = false
    }
  }, [userId, conversationId, messageInput, invoke, addOptimisticMessage])

  const sendFile = useCallback(
    async (file: File) => {
      if (!userId) return
      if (!conversationId) return
      if (!file) return

      if (sendingFileRef.current) return

      // Evita archivos vacíos
      if (file.size <= 0) {
        console.warn('Invalid file')
        return
      }

      // Límite ejemplo: 20MB
      const MAX_FILE_SIZE = 20 * 1024 * 1024

      if (file.size > MAX_FILE_SIZE) {
        console.warn('File exceeds maximum allowed size')
        return
      }

      sendingFileRef.current = true

      const tempId = createTempId()

      const type = getFileType(file)

      addOptimisticFileMessage(tempId, file.name, type)

      try {
        const fileUrl = await uploadFile(file)

        if (!fileUrl) {
          throw new Error('File upload failed')
        }

        await invoke('SendMessage', conversationId, null, fileUrl, file.name, type)
      } catch (error) {
        console.error('Error sending file:', error)

        // Opcional:
        // removeOptimisticMessage(tempId)
      } finally {
        sendingFileRef.current = false
      }
    },
    [userId, conversationId, invoke, addOptimisticFileMessage],
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
