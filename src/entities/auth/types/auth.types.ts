export interface AuthTokenResponse {
  mensaje: string
  accessToken: string
}

export interface User {
  id: string
  username: string
  email: string
  phone: string
  createdAt: string
  isOnline: boolean
  lastSeen: string | null
}

export type MeResponse = User
