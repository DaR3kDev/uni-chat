import { http } from '@/shared/api/http'

export const createContact = async (payload: { alias: string; phone: string }) => {
  const { data } = await http.post(`contacts`, payload)
  return data
}

export const getContacts = async (page: number = 1, pageSize: number = 20, search: string = '') => {
  const { data } = await http.get(`contacts?Page=${page}&PageSize=${pageSize}&Search=${search}`)
  return data
}

export const deleteContact = async (contactId: string) => {
  const { data } = await http.delete(`contacts/${contactId}`)
  return data
}
