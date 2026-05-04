import { http } from '@/shared/api/http'
import type { AuthTokenResponse, MeResponse } from '../types/auth.types'

export const login = async (payload: { phone: string }) => {
  const { data } = await http.post<AuthTokenResponse>('auth/login', payload)
  return data
}

export const register = async (payload: { username: string; phone: string; email: string }) => {
  const { data } = await http.post<AuthTokenResponse>('auth/register', payload)
  return data
}

export const getMe = async () => {
  const { data } = await http.get<MeResponse>('auth/me')
  console.log(data)
  return data
}

export const logout = async () => {
  await http.post('auth/logout')
}
