export type RegisterPayload = {
  nombre: string
  username: string
  email: string
  password: string
  codigo_pais: string
  numero: string
}

export type RegisterResponse = {
  access_token: string
  user: unknown
}

export type ApiError = {
  detail?: string
}
