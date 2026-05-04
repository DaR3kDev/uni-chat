import { Button } from '@/shared/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/field'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { Link } from '@tanstack/react-router'
import { Loader2, LockKeyhole, Phone } from 'lucide-react'

import { loginSchema, type LoginSchema } from '../schemas/login.schema'
import { useLogin } from '../hooks/use-login'

export function LoginForm() {
  const { mutate, isPending } = useLogin()

  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
    },
  })

  const onSubmit = (data: LoginSchema) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <FieldGroup
        className="
          relative overflow-hidden
          rounded-3xl
          border border-border/60
          bg-background/80
          p-5 shadow-2xl backdrop-blur-xl
          sm:p-7
        "
      >
        {/* GLOW EFFECT */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 space-y-7">
          {/* HEADER */}
          <div className="space-y-3 text-center">
            <div
              className="
                mx-auto flex h-14 w-14 items-center justify-center
                rounded-2xl bg-primary/10
                shadow-lg shadow-primary/10
              "
            >
              <LockKeyhole className="h-6 w-6 text-primary" />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Iniciar sesión</h1>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Ingresa tu número de teléfono para continuar en UniChat
              </p>
            </div>
          </div>

          {/* PHONE FIELD */}
          <Field className="space-y-2">
            <FieldLabel className="text-sm font-medium">Número de teléfono</FieldLabel>

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <div
                  className="
                    group relative overflow-hidden
                    rounded-2xl border border-border/60
                    bg-background/60
                    transition-all duration-300
                    hover:border-primary/30
                    focus-within:border-primary/40
                    focus-within:ring-2
                    focus-within:ring-primary/20
                  "
                >
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                    <Phone className="h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  </div>

                  <div className="px-4 py-3 pl-11">
                    <PhoneInput
                      {...field}
                      defaultCountry="CO"
                      international
                      countryCallingCodeEditable={false}
                      className="phone-input-modern"
                    />
                  </div>
                </div>
              )}
            />
          </Field>

          {/* BUTTON */}
          <Button
            type="submit"
            disabled={isPending}
            className="
              h-12 w-full rounded-2xl
              text-sm font-medium
              shadow-lg shadow-primary/20
              transition-all duration-300
              hover:scale-[1.01]
              active:scale-[0.99]
            "
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando...
              </span>
            ) : (
              'Continuar'
            )}
          </Button>

          {/* SEPARATOR */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/60" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-xs text-muted-foreground">o</span>
            </div>
          </div>

          {/* FOOTER */}
          <div className="text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/register"
              className="
                font-semibold text-primary
                transition-all hover:opacity-80
              "
            >
              Regístrate
            </Link>
          </div>
        </div>
      </FieldGroup>
    </form>
  )
}
