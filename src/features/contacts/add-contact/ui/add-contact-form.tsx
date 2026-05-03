import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

import { contactSchema, type ContactSchema } from '../schemas/contact.schema'
import { useCreateContact } from '../hooks/use-create-contact'
import { queryClient } from '@/shared/lib/query-client'

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
      onSuccess: async () => {
        reset()
        onSuccess?.()
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 pt-2">
      {/* ALIAS */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="alias" className="text-xs text-muted-foreground">
          Nombre
        </Label>

        <Input
          id="alias"
          placeholder="Ej: Juan Pérez"
          {...register('alias')}
          className="h-10 rounded-xl"
        />

        {errors.alias && <span className="text-xs text-red-500">{errors.alias.message}</span>}
      </div>

      {/* PHONE */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Número de teléfono</Label>

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <div className="rounded-xl border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30 transition">
              <PhoneInput
                international
                defaultCountry="CO"
                value={field.value}
                onChange={field.onChange}
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          )}
        />

        {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={isPending}
          className="
            rounded-xl px-5
            transition
            active:scale-95
          "
        >
          {isPending ? 'Guardando...' : 'Guardar contacto'}
        </Button>
      </div>
    </form>
  )
}
