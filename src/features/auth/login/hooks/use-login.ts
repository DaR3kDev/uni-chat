import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { getMe, login } from '@/entities/auth/api/auth.api'
import { authStorage } from '@/entities/auth/model/storage/auth-storage'
import type { AuthTokenResponse } from '@/entities/auth/types/auth.types'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/entities/auth/model/store/auth.store'
import type { ApiError } from '@/shared/types/api-error'

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
        console.log('User:', authStorage.setUser(user))
        setUser(user)

        navigate({ to: '/chat' })
      } catch (error) {
        console.error('Error cargando perfil:', error)
        toast.error('Error cargando tu perfil')
      }
    },

    onError: error => {
      const message = error.response?.data?.Message ?? 'Error al iniciar sesión'
      console.error('Login error:', message)
      toast.error(message)
    },
  })
}
