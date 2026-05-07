import type * as signalR from '@microsoft/signalr'
import type { ChatHubEvents } from '../types/chat-hub-events.types'

type Handlers = Partial<{
  [K in keyof ChatHubEvents]: (data: ChatHubEvents[K]) => void
}>

interface ChatHubEventsParams {
  connection: signalR.HubConnection
  handlers: Handlers
}

export function registerChatHubEvents({ connection, handlers }: ChatHubEventsParams) {
  const handleReceiveMessage = (data: any) => {
    console.log('Received message:', data)
    if (data.type === 'TEXT') {
      handlers.ReceiveTextMessage?.(data)
    } else {
      handlers.ReceiveFileMessage?.(data)
    }
  }

  connection.off('ReceiveMessage')
  connection.off('UserTyping')
  connection.off('JoinedConversation')
  connection.off('MessageDelivered')
  connection.off('MessageRead')

  connection.on('ReceiveMessage', handleReceiveMessage)

  if (handlers.UserTyping) connection.on('UserTyping', handlers.UserTyping)

  if (handlers.JoinedConversation) connection.on('JoinedConversation', handlers.JoinedConversation)

  if (handlers.MessageDelivered) connection.on('MessageDelivered', handlers.MessageDelivered)

  if (handlers.MessageRead) connection.on('MessageRead', handlers.MessageRead)
}
