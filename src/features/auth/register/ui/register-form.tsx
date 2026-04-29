import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import PhoneInput from 'react-phone-number-input'
import { registerSchema, type RegisterSchema } from '../schemas/register.schema'
import { useRegister } from '../hooks/use-register'

export function RegisterForm() {
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState<string | undefined>()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const mutation = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterSchema) => {
    const cleanPhone = phone?.replace(/\D/g, '') || ''

    mutation.mutate({
      nombre: data.nombre,
      username: data.username,
      email: data.email,
      password: data.password,
      codigo_pais: '+57',
      numero: cleanPhone.replace(/^57/, ''),
    })
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="space-y-5 sm:space-y-6">
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-xl font-bold">Crear cuenta</h1>
          <p className="text-sm text-muted-foreground">Regístrate para comenzar a chatear</p>
        </div>

        {/* STEPS */}
        <div className="relative overflow-hidden">
          <div
            className={`flex transition-transform ${step === 1 ? 'translate-x-0' : '-translate-x-full'}`}
          >
            {/* STEP 1 */}
            <div className="min-w-full space-y-4 pr-1">
              <Field>
                <FieldLabel>Nombre</FieldLabel>
                <Input placeholder="Juan Pérez" {...register('nombre')} />
                <p className="text-red-500 text-xs">{errors.nombre?.message}</p>
              </Field>

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

              <Button type="button" onClick={() => setStep(2)}>
                Siguiente
              </Button>
            </div>

            {/* STEP 2 */}
            <div className="min-w-full space-y-4 pl-1">
              <Field>
                <FieldLabel>Teléfono</FieldLabel>
                <PhoneInput international defaultCountry="CO" value={phone} onChange={setPhone} />
              </Field>

              {/* PASSWORD */}
              <Field>
                <FieldLabel>Contraseña</FieldLabel>
                <div className="relative">
                  <Input
                    placeholder="Mínimo 8 caracteres"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-red-500 text-xs">{errors.password?.message}</p>
              </Field>

              {/* CONFIRM PASSWORD */}
              <Field>
                <FieldLabel>Confirmar contraseña</FieldLabel>
                <div className="relative">
                  <Input
                    placeholder="Repite tu contraseña"
                    type={showConfirm ? 'text' : 'password'}
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-red-500 text-xs">{errors.confirmPassword?.message}</p>
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
