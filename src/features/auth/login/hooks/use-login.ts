import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { login } from '../api/login.api'
import { authStorage } from '../model/auth-storage'
import type { LoginPayload, AuthTokenResponse, ApiError } from '../types/login.types'

export function useLogin() {
  const navigate = useNavigate()

  return useMutation<AuthTokenResponse, AxiosError<ApiError>, LoginPayload>({
    mutationFn: login,

    onSuccess: ({ access_token }) => {
      authStorage.setToken(access_token)

      toast.success('Bienvenido')
      navigate({ to: '/chat' })
    },

    onError: error => {
      const message = error.response?.data?.detail ?? 'Error al iniciar sesión'

      toast.error(message)
    },
  })
}
