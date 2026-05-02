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
  onReceiveMessage,
  onTyping,
  onJoinedConversation,
  onMessageDelivered,
  onMessageRead,
}: UseChatHubParams = {}) {
  const connectionRef = useRef<signalR.HubConnection | null>(null)

  const joinConversation = useCallback(
    async (connection: signalR.HubConnection) => {
      if (!conversationId) return

      await connection.invoke('JoinConversation', conversationId)

      console.log('📥 Conversación conectada:', conversationId)
    },
    [conversationId],
  )

  const leaveConversation = useCallback(
    async (connection: signalR.HubConnection) => {
      if (!conversationId) return

      if (connection.state !== signalR.HubConnectionState.Connected) {
        return
      }

      await connection.invoke('LeaveConversation', conversationId)

      console.log('📤 Conversación abandonada:', conversationId)
    },
    [conversationId],
  )

  useEffect(() => {
    const connection = createChatHubConnection()

    connectionRef.current = connection

    registerChatHubEvents({
      connection,
      handlers: {
        ReceiveMessage: onReceiveMessage,
        UserTyping: onTyping,
        UserJoined: onJoinedConversation,
        MessageDelivered: onMessageDelivered,
        MessageRead: onMessageRead,
      },
    })

    connection.onclose(error => {
      console.error('❌ Conexión SignalR cerrada', error)
    })

    connection.onreconnecting(error => {
      console.warn('🔄 Reconectando SignalR...', error)
    })

    connection.onreconnected(async () => {
      console.log('✅ SignalR reconectado')

      try {
        await joinConversation(connection)
      } catch (error) {
        console.error('❌ Error reconectando conversación', error)
      }
    })

    async function startConnection() {
      try {
        console.log('🚀 Iniciando SignalR...')

        await connection.start()

        console.log('✅ SignalR conectado')

        await joinConversation(connection)
      } catch (error) {
        console.error('❌ Error iniciando SignalR', error)
      }
    }

    startConnection()

    return () => {
      async function cleanup() {
        try {
          await leaveConversation(connection)

          await connection.stop()

          console.log('🛑 SignalR detenido')
        } catch (error) {
          console.error('❌ Error cerrando SignalR', error)
        }
      }

      cleanup()
    }
  }, [
    joinConversation,
    leaveConversation,
    onReceiveMessage,
    onTyping,
    onJoinedConversation,
    onMessageDelivered,
    onMessageRead,
  ])

  const invoke = useCallback(async (method: string, ...args: unknown[]) => {
    const connection = connectionRef.current

    if (!connection) {
      throw new Error('La conexión SignalR no existe')
    }

    if (connection.state !== signalR.HubConnectionState.Connected) {
      throw new Error('SignalR no está conectado')
    }

    return connection.invoke(method, ...args)
  }, [])

  return {
    invoke,
  }
}
