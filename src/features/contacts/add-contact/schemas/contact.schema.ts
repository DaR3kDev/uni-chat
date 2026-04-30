import { z } from 'zod'

/**
 * Alias:
 * - Solo letras (incluye acentos)
 * - Espacios simples entre palabras
 * - Sin números ni símbolos
 * - Sin doble espacio
 */
const alias = /^(?!.*__)[a-z0-9](?:[a-z0-9_]{1,18}[a-z0-9])?$/
const phoneRegex = /^\+[1-9]\d{7,14}$/

export const contactSchema = z.object({
  alias: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, 'Mínimo 3 caracteres')
    .max(20, 'Máximo 20 caracteres')
    .regex(alias, 'Username inválido (solo letras, números y _)')
    .refine(v => !v.includes(' '), 'No puede contener espacios')
    .refine(v => !v.startsWith('_') && !v.endsWith('_'), 'No puede iniciar o terminar en _'),

  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Formato inválido. Usa formato internacional tipo +573001234567'),
})

export type ContactSchema = z.infer<typeof contactSchema>
