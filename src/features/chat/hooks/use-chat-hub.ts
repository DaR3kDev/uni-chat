import { useCallback, useEffect, useRef } from 'react'
import * as signalR from '@microsoft/signalr'
import { createChatHubConnection } from '../signalr/chat-hub-connection'
import { registerChatHubEvents } from '../signalr/chat-hub-events'
import type { UseChatHubProps } from '../types/chat.types'

interface UseChatHubParams extends UseChatHubProps {
  conversationId?: string
}

export function useChatHub({
  conversationId,
  onReceiveTextMessage,
  onReceiveFileMessage,
  onTyping,
  onJoinedConversation,
  onMessageDelivered,
  onMessageRead,
}: UseChatHubParams = {}) {
  const connectionRef = useRef<signalR.HubConnection | null>(null)

  const handlersRef = useRef({
    onReceiveTextMessage,
    onReceiveFileMessage,
    onTyping,
    onJoinedConversation,
    onMessageDelivered,
    onMessageRead,
  })

  useEffect(() => {
    handlersRef.current = {
      onReceiveTextMessage,
      onReceiveFileMessage,
      onTyping,
      onJoinedConversation,
      onMessageDelivered,
      onMessageRead,
    }
  }, [
    onReceiveTextMessage,
    onReceiveFileMessage,
    onTyping,
    onJoinedConversation,
    onMessageDelivered,
    onMessageRead,
  ])

  const joinConversation = useCallback(
    async (connection: signalR.HubConnection) => {
      if (!conversationId) return
      await connection.invoke('JoinConversation', conversationId)
    },
    [conversationId],
  )

  const leaveConversation = useCallback(
    async (connection: signalR.HubConnection) => {
      if (!conversationId) return
      if (connection.state !== signalR.HubConnectionState.Connected) return

      await connection.invoke('LeaveConversation', conversationId)
    },
    [conversationId],
  )

  useEffect(() => {
    const connection = createChatHubConnection()
    connectionRef.current = connection

    registerChatHubEvents({
      connection,
      handlers: {
        ReceiveTextMessage: handlersRef.current.onReceiveTextMessage,
        ReceiveFileMessage: handlersRef.current.onReceiveFileMessage,
        UserTyping: handlersRef.current.onTyping,
        JoinedConversation: handlersRef.current.onJoinedConversation,
        MessageDelivered: handlersRef.current.onMessageDelivered,
        MessageRead: handlersRef.current.onMessageRead,
      },
    })

    connection.onclose(() => console.warn('SignalR closed'))
    connection.onreconnecting(() => console.warn('SignalR reconnecting'))

    connection.onreconnected(async () => {
      await joinConversation(connection)
    })

    const start = async () => {
      await connection.start()
      await joinConversation(connection)
    }

    start()

    return () => {
      const cleanup = async () => {
        await leaveConversation(connection)
        await connection.stop()
      }

      cleanup()
    }
  }, [conversationId, joinConversation, leaveConversation])

  const invoke = useCallback(async (method: string, ...args: unknown[]) => {
    const connection = connectionRef.current

    if (!connection) throw new Error('SignalR no existe')
    if (connection.state !== signalR.HubConnectionState.Connected)
      throw new Error('SignalR no conectado')

    return connection.invoke(method, ...args)
  }, [])

  return { invoke }
}
