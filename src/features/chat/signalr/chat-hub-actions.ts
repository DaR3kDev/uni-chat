import * as signalR from '@microsoft/signalr'

export async function safeInvoke(
  connection: signalR.HubConnection | null,
  method: string,
  ...args: unknown[]
) {
  if (!connection) {
    console.warn(`[SignalR:${method}] sin conexión`)
    return
  }

  if (connection.state !== signalR.HubConnectionState.Connected) {
    console.warn(`[SignalR:${method}] no está conectado`)
    return
  }

  try {
    await connection.invoke(method, ...args)
  } catch (err) {
    console.error(`[SignalR:${method}] error al ejecutar el método:`, err)
  }
}
