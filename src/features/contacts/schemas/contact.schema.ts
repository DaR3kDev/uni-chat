import { z } from 'zod'

export const contactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, 'Nombre muy corto')
    .max(50, 'Nombre muy largo')
    .refine(val => /^[A-Za-zÀ-ÿ\s]+$/.test(val), 'Solo letras y espacios'),

  numero: z
    .string()
    .trim()
    .min(7, 'Número muy corto')
    .max(15, 'Número muy largo')
    .regex(/^\+\d+$/, 'Número inválido (debe incluir código país)'),
})

export type ContactSchema = z.infer<typeof contactSchema>
