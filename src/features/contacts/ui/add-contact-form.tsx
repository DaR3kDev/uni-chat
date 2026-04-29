import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { contactSchema, type ContactSchema } from '../schemas/contact.schema'
import { useCreateContact } from '../hooks/use-create-contact'

type Props = {
  userId: string
  onSuccess?: () => void
}

export function AddContactForm({ userId, onSuccess }: Props) {
  const { mutate, isPending } = useCreateContact({ userId })

  const { register, handleSubmit, control, reset } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: '',
      numero: '',
    },
  })

  const onSubmit = (data: ContactSchema) => {
    mutate(data, {
      onSuccess: () => {
        reset()
        onSuccess?.()
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 pt-2">
      {/* Nombre */}
      <div className="flex flex-col gap-1">
        <Label>Nombre</Label>
        <Input {...register('nombre')} placeholder="Ej: Juan Pérez" />
      </div>

      {/* Teléfono */}
      <div className="flex flex-col gap-1">
        <Label>Número</Label>

        <Controller
          name="numero"
          control={control}
          render={({ field }) => (
            <PhoneInput
              international
              defaultCountry="CO"
              value={field.value}
              onChange={field.onChange}
              className="phone-input"
            />
          )}
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}
