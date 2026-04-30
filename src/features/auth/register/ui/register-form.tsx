import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { Button } from '@/shared/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { registerSchema, type RegisterSchema } from '../schemas/register.schema'
import { useRegister } from '../hooks/use-register'

export function RegisterForm() {
  const [step, setStep] = useState(1)

  const mutation = useRegister()

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

  const nextStep = async () => {
    const valid = await trigger(['username', 'email'])
    if (valid) setStep(2)
  }

  // SUBMIT FINAL
  const onSubmit = (data: RegisterSchema) => {
    console.log('SUBMIT DATA:', data)

    mutation.mutate({
      ...data,
    })
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="space-y-5">
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-xl font-bold">Crear cuenta</h1>
          <p className="text-sm text-muted-foreground">Regístrate para comenzar a chatear</p>
        </div>

        {/* STEPS */}
        <div className="relative overflow-hidden">
          <div
            className={`flex transition-transform ${
              step === 1 ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* STEP 1 */}
            <div className="min-w-full space-y-4 pr-2">
              <Field>
                <FieldLabel>Usuario</FieldLabel>
                <Input placeholder="juan_dev" {...register('username')} />
                <p className="text-red-500 text-xs">{errors.username?.message}</p>
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input placeholder="correo@ejemplo.com" {...register('email')} />
                <p className="text-red-500 text-xs">{errors.email?.message}</p>
              </Field>

              <Button type="button" onClick={nextStep}>
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

                <p className="text-red-500 text-xs">{errors.phone?.message}</p>
              </Field>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Atrás
                </Button>

                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? 'Creando...' : 'Crear cuenta'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* LOGIN LINK */}
        <Field>
          <FieldDescription className="text-center text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="underline font-medium">
              Inicia sesión
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
