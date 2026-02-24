import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog'
import type { ReactNode } from 'react'

interface AlertDialogGenericProps {
  trigger: ReactNode
  title: string
  description: string | ReactNode
  confirmText: string
  cancelText: string
  onConfirm: () => void
  triggerClassName?: string
}

export function AlertDialogGeneric({
  trigger,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  triggerClassName,
}: AlertDialogGenericProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className={triggerClassName}>{trigger}</button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
