import { Button } from '@/shared/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

export function LoginForm() {
  return (
    <form>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Inicia sesión</h1>
        </div>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
          <Input id="email" type="email" placeholder="tu@correo.com" required />
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <Input id="password" type="password" placeholder="••••••••" required />
        </Field>

        {/* Button */}
        <Field>
          <Button type="submit" className="w-full">
            Iniciar sesión
          </Button>
        </Field>

        <FieldSeparator>O continúa con</FieldSeparator>

        {/* Register */}
        <Field>
          <FieldDescription className="text-center">
            ¿No tienes una cuenta?{' '}
            <a href="/register" className="underline underline-offset-4">
              Regístrate
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
