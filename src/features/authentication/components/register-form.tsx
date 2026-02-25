import { Button } from '@/shared/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { useState } from 'react'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/shared/ui/combobox'
import { Link } from 'react-router'

const COUNTRIES = [
  { value: '+57', label: '🇨🇴 Colombia (+57)' },
  { value: '+52', label: '🇲🇽 México (+52)' },
  { value: '+34', label: '🇪🇸 España (+34)' },
  { value: '+54', label: '🇦🇷 Argentina (+54)' },
]

const DEFAULT_COUNTRY = '+57'

export function RegisterForm() {
  const [country, setCountry] = useState(DEFAULT_COUNTRY)
  const [step, setStep] = useState(1)

  return (
    <form>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crear cuenta</h1>
          <p className="text-muted-foreground text-sm">Regístrate para comenzar a chatear</p>
        </div>

        <div className="relative overflow-hidden">
          <div
            className={`flex transition-transform duration-500 ease-out ${
              step === 1 ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="min-w-full space-y-4">
              <Field>
                <FieldLabel>Nombre</FieldLabel>
                <Input placeholder="Kevin Pérez" required />
              </Field>

              <Field>
                <FieldLabel>Usuario</FieldLabel>
                <Input placeholder="kevinp" required />
              </Field>

              <Field>
                <FieldLabel>Correo electrónico</FieldLabel>
                <Input type="email" placeholder="tu@correo.com" required />
              </Field>

              <Button type="button" className="w-full" onClick={() => setStep(2)}>
                Siguiente
              </Button>
            </div>

            <div className="min-w-full space-y-4 pl-1">
              <Field>
                <FieldLabel>Número de teléfono</FieldLabel>
                <div className="flex gap-2">
                  <div className="w-36">
                    <Combobox
                      items={COUNTRIES}
                      value={country}
                      onValueChange={value => setCountry(value ?? DEFAULT_COUNTRY)}
                    >
                      <ComboboxInput placeholder="Prefijo" />
                      <ComboboxContent>
                        <ComboboxEmpty>No encontrado</ComboboxEmpty>
                        <ComboboxList>
                          {item => (
                            <ComboboxItem key={item.value} value={item.value}>
                              {item.label}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </div>

                  <Input type="tel" placeholder="300 000 0000" className="flex-1" />
                </div>
              </Field>

              <Field>
                <FieldLabel>Contraseña</FieldLabel>
                <Input type="password" required />
              </Field>

              <Field>
                <FieldLabel>Confirmar contraseña</FieldLabel>
                <Input type="password" required />
              </Field>

              <div className="flex gap-2">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="w-full"
                  >
                    Atrás
                  </Button>

                  <Button type="submit" className="w-full">
                    Confirmar
                  </Button>
                </div>
                <Button type="submit" className="w-full">
                  Crear cuenta
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Field>
          <FieldDescription className="text-center">
            ¿Ya tienes una cuenta?
            <Link to="/" className="underline underline-offset-4">
              Inicia sesión
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
