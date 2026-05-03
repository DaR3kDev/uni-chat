import * as signalR from '@microsoft/signalr'

export async function safeInvoke(
  connection: signalR.HubConnection | null,
  method: string,
  ...args: unknown[]
) {
  if (!connection) {
    return
  }

  if (connection.state !== signalR.HubConnectionState.Connected) {
    return
  }

  try {
    await connection.invoke(method, ...args)
  } catch (err) {
    console.error(`[SignalR:${method}] error al ejecutar el método:`, err)
  }
}
