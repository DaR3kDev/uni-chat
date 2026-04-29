import { z } from 'zod'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(5, 'Email inválido')
    .max(100, 'Email demasiado largo')
    .regex(emailRegex, 'Formato de email inválido')
    .refine(val => !val.includes(' '), 'El email no puede contener espacios'),

  password: z
    .string()
    .min(8, 'La contraseña es muy corta (mínimo 8)')
    .max(50, 'La contraseña es muy larga')
    .refine(val => !val.includes(' '), 'No puede contener espacios')
    .refine(val => val.trim() === val, 'No espacios al inicio o final'),
})

export type LoginSchema = z.infer<typeof loginSchema>
