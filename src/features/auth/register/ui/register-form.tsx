import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { Button } from '@/shared/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/field'
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
    message ? <p className="text-xs text-red-500">{message}</p> : null

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <FieldGroup className="space-y-5">
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-xl font-bold">Crear cuenta</h1>
          <p className="text-sm text-muted-foreground">Regístrate para comenzar a chatear</p>
        </div>

        {/* STEPS */}
        <div className="relative overflow-hidden">
          <div
            className={`flex transition-transform duration-300 ${
              step === 1 ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* STEP 1 */}
            <div className="min-w-full space-y-4 pr-2">
              <Field>
                <FieldLabel>Usuario</FieldLabel>
                <Input placeholder="juan_dev" {...register('username')} />
                <ErrorText message={errors.username?.message} />
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input placeholder="correo@ejemplo.com" {...register('email')} />
                <ErrorText message={errors.email?.message} />
              </Field>

              <Button type="button" onClick={goNextStep}>
                Siguiente
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
                    <PhoneInput
                      international
                      defaultCountry="CO"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                <ErrorText message={errors.phone?.message} />
              </Field>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Atrás
                </Button>

                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Creando...' : 'Crear cuenta'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* LOGIN */}
        <div className="text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-medium underline">
            Inicia sesión
          </Link>
        </div>
      </FieldGroup>
    </form>
  )
}
