import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

import { contactSchema, type ContactSchema } from '../schemas/contact.schema'
import { useCreateContact } from '../hooks/use-create-contact'

type AddContactFormProps = {
  onSuccess?: () => void
}

export function AddContactForm({ onSuccess }: AddContactFormProps) {
  const { mutate, isPending } = useCreateContact()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      alias: '',
      phone: '',
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
      {/* ALIAS */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="alias">Nombre</Label>

        <Input id="alias" placeholder="Ej: Juan Pérez" {...register('alias')} />

        {errors.alias && <span className="text-sm text-red-500">{errors.alias.message}</span>}
      </div>

      {/* PHONE */}
      <div className="flex flex-col gap-1">
        <Label>Número</Label>

        <Controller
          name="phone"
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

        {errors.phone && <span className="text-sm text-red-500">{errors.phone.message}</span>}
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
