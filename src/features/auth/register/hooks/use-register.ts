import { getMe, register } from '@/entities/auth/api/auth.api'
import type { ApiError } from '@/shared/types/api-error'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import type { AuthTokenResponse } from '@/entities/auth/types/auth.types'

import { authStorage } from '@/entities/auth/model/storage/auth-storage'
import { useAuthStore } from '@/entities/auth/model/store/auth.store'

export function useRegister() {
  const navigate = useNavigate()

  return useMutation<
    AuthTokenResponse,
    AxiosError<ApiError>,
    { username: string; phone: string; email: string }
  >({
    mutationFn: register,

    onSuccess: async data => {
      authStorage.setToken(data.accessToken)

      try {
        const user = await getMe()

        authStorage.setUser(user)

        useAuthStore.getState().setUser(user)
      } catch (error) {
        toast.error('Error cargando perfil', {
          description: (error as Error).message,
        })
      }

      toast.success('Cuenta creada correctamente')

      await navigate({ to: '/chat' })
    },

    onError: error => {
      const message = error.response?.data?.Message ?? 'No se pudo crear la cuenta'

      toast.error(message)
    },
  })
}
