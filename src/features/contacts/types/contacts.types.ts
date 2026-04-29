export type CreateContactPayload = {
  nombre: string
  codigo_pais: string
  numero: string
}

export type ContactResponse = {
  id: string
  nombre: string
  codigo_pais: string
  numero: string
}

export type ApiError = {
  detail?: string
}
