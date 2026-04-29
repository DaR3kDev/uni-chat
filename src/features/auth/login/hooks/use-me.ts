import { useQuery } from '@tanstack/react-query'
import { http } from '@/shared/api/http'
import { useAuthStore } from '../../../../entities/user/model/store/auth.store'
import { authStorage } from '../../../../entities/user/model/storage/auth-storage'

export type MeResponse = {
  id: string
  email: string
  name?: string
}

export function useMe() {
  const setUser = useAuthStore(s => s.setUser)
  const clearUser = useAuthStore(s => s.clear)

  const query = useQuery<MeResponse>({
    queryKey: ['me'],

    queryFn: async () => {
      const { data } = await http.get<MeResponse>('/auth/me')
      return data
    },

    enabled: !!authStorage.getToken(),
    retry: false,
  })

  if (query.data) {
    setUser(query.data)
  }

  if (query.isError) {
    authStorage.clear()
    clearUser()
  }

  return query
}
