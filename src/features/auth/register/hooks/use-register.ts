import { getMe, register } from '@/entities/auth/api/auth.api'
import type { ApiError } from '@/shared/types/api-error'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import type { AuthTokenResponse } from '@/entities/auth/types/auth.types'
import { authStorage } from '@/entities/auth/model/storage/auth-storage'

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

        toast.success('Cuenta creada correctamente')
        navigate({ to: '/chat' })
      } catch (error) {
        toast.error('No se pudo cargar el usuario')
      }
    },

    onError: error => {
      const message = error.response?.data?.Message ?? 'No se pudo crear la cuenta'

      toast.error(message)
    },
  })
}
