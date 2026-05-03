import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

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
    if (isValid) setStep(2)
  }

  const onSubmit = (data: RegisterSchema) => {
    mutate(data)
  }

  const ErrorText = ({ message }: { message?: string }) =>
    message ? <p className="text-xs text-red-500 mt-1">{message}</p> : null

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-2xl border bg-card shadow-xl p-6 space-y-6"
      >
        {/* HEADER */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Crear cuenta</h1>
          <p className="text-sm text-muted-foreground">Regístrate para comenzar a chatear</p>
        </div>

        {/* STEP INDICATOR */}
        <div className="flex items-center justify-center gap-2">
          <div className={`h-1.5 w-10 rounded-full ${step === 1 ? 'bg-primary' : 'bg-muted'}`} />
          <div className={`h-1.5 w-10 rounded-full ${step === 2 ? 'bg-primary' : 'bg-muted'}`} />
        </div>

        {/* STEPS */}
        <div className="overflow-hidden">
          <div
            className={`flex transition-transform duration-300 ease-in-out ${
              step === 1 ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* STEP 1 */}
            <div className="min-w-full space-y-4 pr-2">
              <Field>
                <FieldLabel>Usuario</FieldLabel>
                <Input
                  placeholder="juan_dev"
                  className="h-11 rounded-xl"
                  {...register('username')}
                />
                <ErrorText message={errors.username?.message} />
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  placeholder="correo@ejemplo.com"
                  className="h-11 rounded-xl"
                  {...register('email')}
                />
                <ErrorText message={errors.email?.message} />
              </Field>

              <Button type="button" onClick={goNextStep} className="w-full rounded-xl">
                Continuar
              </Button>
            </div>

            {/* STEP 2 */}
            <div className="min-w-full space-y-4 pl-2">
              <Field>
                <FieldLabel>Teléfono</FieldLabel>

                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <div className="rounded-xl border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-primary/20 transition">
                      <PhoneInput
                        international
                        defaultCountry="CO"
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full text-sm outline-none bg-transparent"
                      />
                    </div>
                  )}
                />

                <ErrorText message={errors.phone?.message} />
              </Field>

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-xl"
                >
                  Atrás
                </Button>

                <Button type="submit" disabled={isPending} className="flex-1 rounded-xl">
                  {isPending ? 'Creando...' : 'Crear cuenta'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* LOGIN */}
        <div className="text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  )
}
