import axios from 'axios'
import { authStorage } from '@/entities/auth/model/storage/auth-storage'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(config => {
  const token = authStorage.getToken()

  console.log('Token:', token)

  if (token) {
    config.headers = config.headers ?? {}
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

http.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const { data } = await http.post('/auth/refresh')

        authStorage.setToken(data.accessToken)

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`

        return http(originalRequest)
      } catch (err) {
        authStorage.clear()
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  },
)
