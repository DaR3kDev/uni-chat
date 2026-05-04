import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { ArrowLeft, ArrowRight, Check, Mail, User } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { Field, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

import { registerSchema, type RegisterSchema } from '../schemas/register.schema'
import { useRegister } from '../hooks/use-register'

export function RegisterForm() {
  const [step, setStep] = useState<1 | 2>(1)

  const { mutate, isPending } = useRegister()

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  })

  const goNextStep = async () => {
    const isValid = await trigger(['username', 'email'])

    if (isValid) {
      setStep(2)
    }
  }

  const onSubmit = (data: RegisterSchema) => {
    mutate(data)
  }

  const ErrorText = ({ message }: { message?: string }) =>
    message ? <p className="mt-1.5 text-xs font-medium text-red-500">{message}</p> : null

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          relative overflow-hidden
          rounded-3xl
          border border-border/60
          bg-background/80
          p-5 shadow-2xl backdrop-blur-xl
          sm:p-7
        "
      >
        {/* GLOW */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* HEADER */}
          <div className="space-y-2 text-center">
            <div
              className="
                mx-auto flex h-14 w-14 items-center justify-center
                rounded-2xl bg-primary/10
              "
            >
              <User className="h-6 w-6 text-primary" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Crear cuenta</h1>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Regístrate para comenzar a chatear en UniChat
            </p>
          </div>

          {/* STEP INDICATOR */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`
                  flex h-8 w-8 items-center justify-center rounded-full
                  text-xs font-semibold transition-all duration-300
                  ${
                    step === 1
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                      : 'bg-primary/15 text-primary'
                  }
                `}
              >
                {step > 1 ? <Check className="h-4 w-4" /> : '1'}
              </div>

              <div
                className={`
                  h-1 w-12 rounded-full transition-all duration-300
                  ${step === 2 ? 'bg-primary' : 'bg-muted'}
                `}
              />
            </div>

            <div
              className={`
                flex h-8 w-8 items-center justify-center rounded-full
                text-xs font-semibold transition-all duration-300
                ${
                  step === 2
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-muted text-muted-foreground'
                }
              `}
            >
              2
            </div>
          </div>

          {/* FORM CONTENT */}
          <div className="mt-8 overflow-hidden">
            <div
              className={`
                flex transition-transform duration-500 ease-out
                ${step === 1 ? 'translate-x-0' : '-translate-x-full'}
              `}
            >
              {/* STEP 1 */}
              <div className="min-w-full space-y-5 pr-1">
                <Field className="space-y-2">
                  <FieldLabel className="text-sm font-medium">Usuario</FieldLabel>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      placeholder="juan_dev"
                      className="
                        h-12 rounded-2xl border-border/60
                        bg-background/60 pl-10
                        transition-all duration-300
                        focus-visible:ring-2 focus-visible:ring-primary/20
                      "
                      {...register('username')}
                    />
                  </div>

                  <ErrorText message={errors.username?.message} />
                </Field>

                <Field className="space-y-2">
                  <FieldLabel className="text-sm font-medium">Correo electrónico</FieldLabel>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className="
                        h-12 rounded-2xl border-border/60
                        bg-background/60 pl-10
                        transition-all duration-300
                        focus-visible:ring-2 focus-visible:ring-primary/20
                      "
                      {...register('email')}
                    />
                  </div>

                  <ErrorText message={errors.email?.message} />
                </Field>

                <Button
                  type="button"
                  onClick={goNextStep}
                  className="
                    mt-2 h-12 w-full rounded-2xl
                    text-sm font-medium shadow-lg
                    shadow-primary/20 transition-all duration-300
                    hover:scale-[1.01]
                  "
                >
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* STEP 2 */}
              <div className="min-w-full space-y-5 pl-1">
                <Field className="space-y-2">
                  <FieldLabel className="text-sm font-medium">Número de teléfono</FieldLabel>

                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <div
                        className="
                          rounded-2xl border border-border/60
                          bg-background/60 px-4 py-3
                          transition-all duration-300
                          focus-within:ring-2
                          focus-within:ring-primary/20
                        "
                      >
                        <PhoneInput
                          international
                          defaultCountry="CO"
                          value={field.value}
                          onChange={field.onChange}
                          className="phone-input-modern"
                        />
                      </div>
                    )}
                  />

                  <ErrorText message={errors.phone?.message} />
                </Field>

                {/* ACTIONS */}
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="
                      h-12 flex-1 rounded-2xl border-border/60
                    "
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Atrás
                  </Button>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="
                      h-12 flex-1 rounded-2xl
                      shadow-lg shadow-primary/20
                    "
                  >
                    {isPending ? 'Creando cuenta...' : 'Crear cuenta'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/login"
              className="
                font-semibold text-primary
                transition hover:opacity-80
              "
            >
              Inicia sesión
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
