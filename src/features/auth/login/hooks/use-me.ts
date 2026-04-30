import { useQuery } from '@tanstack/react-query'
import { authStorage } from '@/entities/auth/model/storage/auth-storage'
import type { MeResponse } from '@/entities/auth/types/auth.types'

import { getMe } from '@/entities/auth/api/auth.api'

export function useMe() {
  return useQuery<MeResponse>({
    queryKey: ['me'],

    queryFn: async () => {
      const data = await getMe()
      return data
    },

    enabled: !!authStorage.getToken(),
    retry: false,
  })
}
