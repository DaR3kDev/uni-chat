export type LoginPayload = {
  email: string
  password: string
}

export type AuthTokenResponse = {
  access_token: string
  user: unknown
}

export type ApiError = {
  detail?: string
}
