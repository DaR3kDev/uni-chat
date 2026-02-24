import { useState, type FormEvent } from 'react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { UserPlus } from 'lucide-react'
import { useDialogStore } from '@/widgets/dialog/store/dialogStore'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/shared/ui/combobox'

const countries = [
  { label: '🇨🇴 Colombia +57', value: '+57' },
  { label: '🇺🇸 USA +1', value: '+1' },
  { label: '🇲🇽 México +52', value: '+52' },
  { label: '🇪🇸 España +34', value: '+34' },
]

export function AddContactDialog() {
  const { openDialog, closeDialog } = useDialogStore()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState<string | null>('+57')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return

    closeDialog()
    setName('')
    setPhone('')
    setCountry('+57')
  }

  const handleOpen = () => {
    openDialog(
      'Nuevo contacto',
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
              items={countries}
              value={country}
              onValueChange={value => setCountry(value ?? '+57')}
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
          <Button type="button" variant="ghost" onClick={closeDialog}>
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>,
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleOpen} variant="ghost" size="sm">
            <UserPlus className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Nuevo contacto</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
