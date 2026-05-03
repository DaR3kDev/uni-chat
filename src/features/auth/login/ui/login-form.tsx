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
    defaultValues: { phone: '' },
  })

  const onSubmit = (data: LoginSchema) => mutate(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto px-4">
      <FieldGroup className="space-y-7 w-full">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-lg font-bold">U</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Iniciar sesión</h1>

          <p className="text-sm text-muted-foreground">
            Ingresa tu número de teléfono para continuar
          </p>
        </div>

        {/* PHONE */}
        <Field className="space-y-2">
          <FieldLabel className="text-xs text-muted-foreground">Número de teléfono</FieldLabel>

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <div
                className="
                  rounded-xl border bg-background
                  px-3 py-2
                  transition
                  focus-within:ring-2 focus-within:ring-primary/30
                  hover:border-muted-foreground/40
                "
              >
                <PhoneInput
                  {...field}
                  defaultCountry="CO"
                  international
                  countryCallingCodeEditable={false}
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            )}
          />
        </Field>

        {/* BUTTON */}
        <Button
          type="submit"
          disabled={isPending}
          className="
            w-full h-11
            rounded-xl
            font-medium
            transition
            active:scale-[0.98]
          "
        >
          {isPending ? 'Enviando...' : 'Continuar'}
        </Button>

        {/* FOOTER */}
        <div className="text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline transition">
            Regístrate
          </Link>
        </div>
      </FieldGroup>
    </form>
  )
}
