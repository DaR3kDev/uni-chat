import { z } from 'zod'

const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,50}$/

export const registerSchema = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(2, 'El nombre es muy corto')
      .max(50, 'El nombre es muy largo')
      .regex(nameRegex, 'Solo letras y espacios')
      .refine(val => val === val.trim(), 'No espacios al inicio o final')
      .refine(val => !/\s{2,}/.test(val), 'No espacios dobles'),

    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(3, 'Mínimo 3 caracteres')
      .max(20, 'Máximo 20 caracteres')
      .regex(usernameRegex, 'Solo letras, números y _')
      .refine(val => !val.includes(' '), 'No puede contener espacios'),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email('Email inválido')
      .max(100, 'Email demasiado largo'),

    password: z
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .max(50, 'Máximo 50 caracteres')
      .regex(passwordRegex, 'Debe incluir mayúscula, minúscula, número y símbolo')
      .refine(val => !val.includes(' '), 'No puede contener espacios'),

    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Las contraseñas no coinciden',
      })
    }

    if (data.username === data.password) {
      ctx.addIssue({
        code: 'custom',
        path: ['username'],
        message: 'Username no puede ser igual a la contraseña',
      })
    }

    if (data.password.toLowerCase().includes(data.username)) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'La contraseña no debe contener el username',
      })
    }
  })
  .strict()

export type RegisterSchema = z.infer<typeof registerSchema>
