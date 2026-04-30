import { Button } from '@/shared/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { loginSchema, type LoginSchema } from '../schemas/login.schema'
import { useLogin } from '../hooks/use-login'
import { Link } from '@tanstack/react-router'

export function LoginForm() {
  const { mutate, isPending } = useLogin()

  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
    },
  })

  const onSubmit = (data: LoginSchema) => mutate(data)

  return (
    <form className="w-full max-w-md mx-auto px-4 sm:px-0" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="space-y-6 w-full">
        {/* HEADER */}
        <div className="text-center space-y-1">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Iniciar sesión</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Ingresa tu número de teléfono</p>
        </div>

        {/* PHONE */}
        <Field className="space-y-2 w-full">
          <FieldLabel>Teléfono</FieldLabel>

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <div className="phone-wrapper">
                <PhoneInput
                  {...field}
                  defaultCountry="CO"
                  international
                  countryCallingCodeEditable={false}
                  className="phone-input"
                />
              </div>
            )}
          />
        </Field>

        {/* BUTTON */}
        <Button
          type="submit"
          className="w-full h-11 sm:h-12 text-sm sm:text-base"
          disabled={isPending}
        >
          {isPending ? 'Enviando...' : 'Continuar'}
        </Button>

        {/* REGISTER LINK */}
        <div className="text-center text-xs sm:text-sm text-muted-foreground">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Regístrate
          </Link>
        </div>
      </FieldGroup>
    </form>
  )
}
