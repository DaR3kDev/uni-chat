import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { register } from '../../../../entities/user/api/register.api'
import type { RegisterPayload, RegisterResponse, ApiError } from '../types/register.types'
import { authStorage } from '@/entities/user/model/storage/auth-storage'

export function useRegister() {
  const navigate = useNavigate()

  return useMutation<RegisterResponse, AxiosError<ApiError>, RegisterPayload>({
    mutationFn: register,

    onSuccess: data => {
      authStorage.setToken(data.access_token)

      toast.success('Cuenta creada correctamente')
      navigate({ to: '/chat' })
    },

    onError: error => {
      const message = error.response?.data?.detail ?? 'No se pudo crear la cuenta'

      toast.error(message)
    },
  })
}
