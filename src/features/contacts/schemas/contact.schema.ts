import { z } from 'zod'

export const contactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, 'Nombre muy corto')
    .max(50, 'Nombre muy largo')
    .refine(val => /^[A-Za-zÀ-ÿ\s]+$/.test(val), 'Solo letras y espacios')
    .refine(val => !/\s{2,}/.test(val), 'No espacios dobles'),

  codigo_pais: z
    .string()
    .trim()
    .regex(/^\+\d{1,4}$/, 'Código de país inválido (ej: +57, +1)'),

  numero: z
    .string()
    .trim()
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val.length >= 7, 'Número demasiado corto')
    .refine(val => val.length <= 15, 'Número demasiado largo')
    .refine(val => /^[0-9]+$/.test(val), 'Solo números permitidos'),
})

export type ContactSchema = z.infer<typeof contactSchema>
