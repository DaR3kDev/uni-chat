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
  connection.off('ReceiveMessage')
  connection.off('UserTyping')
  connection.off('JoinedConversation')
  connection.off('MessageDelivered')
  connection.off('MessageRead')

  connection.on('ReceiveMessage', data => {
    console.log('ReceiveMessage:', data)

    try {
      if (data.type === 'TEXT') {
        handlers.ReceiveTextMessage?.(data)
      } else {
        handlers.ReceiveFileMessage?.(data)
      }
    } catch (error) {
      console.error('ReceiveMessage error:', error)
    }
  })

  connection.on('UserTyping', data => {
    console.log('UserTyping:', data)
    handlers.UserTyping?.(data)
  })

  connection.on('JoinedConversation', data => {
    console.log('JoinedConversation:', data)
    handlers.JoinedConversation?.(data)
  })

  connection.on('MessageDelivered', data => {
    console.log('MessageDelivered:', data)
    handlers.MessageDelivered?.(data)
  })

  connection.on('MessageRead', data => {
    console.log('MessageRead:', data)
    handlers.MessageRead?.(data)
  })
}
