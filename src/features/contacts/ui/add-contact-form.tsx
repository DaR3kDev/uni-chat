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

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: '',
      numero: '',
    },
  })

  const onSubmit = (data: ContactSchema) => {
    const fullNumber = data.numero

    const match = fullNumber.match(/^(\+\d{1,4})(\d+)$/)

    const payload = {
      nombre: data.nombre,
      codigo_pais: match?.[1] || '',
      numero: match?.[2] || '',
    }

    mutate(payload, {
      onSuccess: () => {
        reset()
        onSuccess?.()
      },
    })
  }

  const onInvalid = (errors: any) => {
    console.log('FORM INVALID:', errors)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-5 pt-2">
      {/* NOMBRE */}
      <div className="flex flex-col gap-1">
        <Label>Nombre</Label>
        <Input {...register('nombre')} placeholder="Ej: Juan Pérez" />

        {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}
      </div>

      {/* TELÉFONO */}
      <div className="flex flex-col gap-1">
        <Label>Número</Label>

        <Controller
          name="numero"
          control={control}
          render={({ field }) => (
            <PhoneInput
              international
              defaultCountry="CO"
              value={field.value || ''}
              onChange={value => field.onChange(value ?? '')}
              className="phone-input"
            />
          )}
        />

        {errors.numero && <span className="text-red-500 text-sm">{errors.numero.message}</span>}
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}
