import { useState, type FormEvent } from 'react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/shared/ui/combobox'

type AddContactFormProps = {
  onSuccess?: () => void
}

type Country = {
  label: string
  value: string
}

const DEFAULT_COUNTRY = '+57'

const COUNTRIES: Country[] = [
  { label: '🇨🇴 Colombia +57', value: '+57' },
  { label: '🇺🇸 USA +1', value: '+1' },
  { label: '🇲🇽 México +52', value: '+52' },
  { label: '🇪🇸 España +34', value: '+34' },
]

export function AddContactForm({ onSuccess }: AddContactFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState<string | null>(DEFAULT_COUNTRY)

  const resetForm = () => {
    setName('')
    setPhone('')
    setCountry(DEFAULT_COUNTRY)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim() || !phone.trim()) return

    resetForm()
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-2">
      {/* Nombre */}
      <div className="flex flex-col gap-1">
        <Label>Nombre</Label>
        <Input
          placeholder="Ej: Juan Pérez"
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
        />
      </div>

      {/* Teléfono */}
      <div className="flex flex-col gap-1">
        <Label>Número</Label>

        <div className="flex gap-2">
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

          <Input
            placeholder="3001234567"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  )
}
