import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { getMe, login } from '@/entities/auth/api/auth.api'

import { authStorage } from '@/entities/auth/model/storage/auth-storage'
import { useAuthStore } from '@/entities/auth/model/store/auth.store'

import type { AuthTokenResponse } from '@/entities/auth/types/auth.types'
import type { ApiError } from '@/shared/types/api-error'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export function useLogin() {
  const navigate = useNavigate()

  const setUser = useAuthStore(s => s.setUser)

  return useMutation<AuthTokenResponse, AxiosError<ApiError>, { phone: string }>({
    mutationFn: login,

    onSuccess: async ({ accessToken }) => {
      authStorage.setToken(accessToken)

      try {
        const user = await getMe()

        authStorage.setUser(user)

        setUser(user)
      } catch (error) {
        toast.error('Error cargando perfil', {
          description: (error as Error).message,
        })
      }

      toast.success('Bienvenido')

      await navigate({ to: '/chat' })
    },

    onError: error => {
      const message = error.response?.data?.Message ?? 'Error al iniciar sesión'

      toast.error(message)
    },
  })
}
