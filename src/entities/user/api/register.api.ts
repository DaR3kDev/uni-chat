import { http } from '@/shared/api/http'
import type {
  RegisterPayload,
  RegisterResponse,
} from '../../../features/auth/register/types/register.types'

export const register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const { data } = await http.post<RegisterResponse>('/auth/register', payload)

  return data
}
