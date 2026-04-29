export interface Message {
  _id: string
  remitente_id: string
  destinatario_id: string
  contenido: string
  created_at: string

  fromMe: boolean // obligatorio
  reactions?: any[]
  isVoice?: boolean
  voiceDuration?: string
}

export type SendMessagePayload = {
  remitente_id: string
  destinatario_id: string
  contenido: string
}
