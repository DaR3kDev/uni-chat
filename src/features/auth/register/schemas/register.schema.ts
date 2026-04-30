import { z } from 'zod'

const usernameRegex = /^(?!.*__)[a-z0-9](?:[a-z0-9_]{1,18}[a-z0-9])?$/
const phoneRegex = /^\+[1-9]\d{7,14}$/

const disposableEmailDomains = [
  'tempmail.com',
  'mailinator.com',
  'guerrillamail.com',
  '10minutemail.com',
]

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, 'Mínimo 3 caracteres')
    .max(20, 'Máximo 20 caracteres')
    .regex(usernameRegex, 'Username inválido (solo letras, números y _)')
    .refine(v => !v.includes(' '), 'No puede contener espacios')
    .refine(v => !v.startsWith('_') && !v.endsWith('_'), 'No puede iniciar o terminar en _'),

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

  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(5, 'Email demasiado corto')
    .max(100, 'Email demasiado largo')
    .email('Email inválido')
    .refine(v => !/\s/.test(v), 'Email no puede contener espacios')
    .refine(v => {
      const domain = v.split('@')[1]
      return !disposableEmailDomains.includes(domain)
    }, 'No se permiten correos temporales'),
})

export type RegisterSchema = z.infer<typeof registerSchema>
