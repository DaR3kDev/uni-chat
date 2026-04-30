import { z } from 'zod'

const phoneRegex = /^\+[1-9]\d{7,14}$/

// + obligatorio
// país no puede empezar en 0
// mínimo 8 dígitos después del +
// máximo 15 dígitos (E.164)

export const loginSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(8, 'Número de teléfono inválido')
    .max(20, 'Número de teléfono demasiado largo')
    .refine(val => !/\s/.test(val), {
      message: 'No puede contener espacios',
    })
    .refine(val => phoneRegex.test(val), {
      message: 'Formato inválido. Debe ser internacional tipo +573001234567 (E.164)',
    }),
})

export type LoginSchema = z.infer<typeof loginSchema>
