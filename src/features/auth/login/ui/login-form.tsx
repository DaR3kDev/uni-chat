import { Button } from '@/shared/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { Link } from '@tanstack/react-router'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { loginSchema, type LoginSchema } from '../schemas/login.schema'
import { useLogin } from '../hooks/use-login'

export function LoginForm() {
  const { mutate, isPending } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginSchema) => {
    mutate(data)
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="space-y-5 sm:space-y-6">
        {/* HEADER */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Inicia sesión</h1>
          <p className="text-sm text-muted-foreground">Ingresa tus datos para continuar</p>
        </div>

        {/* EMAIL */}
        <Field className="space-y-2">
          <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="tu@correo.com"
            className="h-10 sm:h-11"
            {...register('email')}
          />
          {errors.email && (
            <FieldDescription className="text-red-500">{errors.email.message}</FieldDescription>
          )}
        </Field>

        {/* PASSWORD */}
        <Field className="space-y-2">
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="h-10 sm:h-11"
            {...register('password')}
          />
          {errors.password && (
            <FieldDescription className="text-red-500">{errors.password.message}</FieldDescription>
          )}
        </Field>

        {/* BUTTON */}
        <Field>
          <Button
            type="submit"
            className="w-full h-10 sm:h-11 text-sm sm:text-base"
            disabled={isPending}
          >
            {isPending ? 'Ingresando...' : 'Iniciar sesión'}
          </Button>
        </Field>

        {/* SEPARATOR */}
        <FieldSeparator className="text-xs sm:text-sm">O continúa con</FieldSeparator>

        {/* REGISTER */}
        <Field>
          <FieldDescription className="text-center text-sm">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/register"
              className="underline underline-offset-4 font-medium hover:text-primary"
            >
              Regístrate
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
