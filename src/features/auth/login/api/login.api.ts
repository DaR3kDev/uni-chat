import { http } from '@/shared/api/http'
import type { LoginPayload, AuthTokenResponse } from '../types/login.types'

export const login = async (payload: LoginPayload): Promise<AuthTokenResponse> => {
  const { data } = await http.post<AuthTokenResponse>('/auth/login', payload)

  return data
}
