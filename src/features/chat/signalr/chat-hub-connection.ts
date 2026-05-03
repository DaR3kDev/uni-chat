import * as signalR from '@microsoft/signalr'
import { authStorage } from '@/entities/auth/model/storage/auth-storage'

export function createChatHubConnection() {
  const token = authStorage.getToken()

  return new signalR.HubConnectionBuilder()
    .withUrl(`${import.meta.env.VITE_SIGNALR_URL}/messages/chat?access_token=${token}`, {
      withCredentials: true,
    })
    .withAutomaticReconnect([0, 2000, 5000, 10000])
    .configureLogging(signalR.LogLevel.Information)
    .build()
}
