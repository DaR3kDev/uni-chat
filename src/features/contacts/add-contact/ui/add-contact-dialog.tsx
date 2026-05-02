import { useCallback } from 'react'
import { UserPlus } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'

import { useDialogStore } from '@/widgets/dialog/store/dialogStore'
import { AddContactForm } from './add-contact-form'

export function AddContactDialog() {
  const openDialog = useDialogStore(s => s.openDialog)
  const closeDialog = useDialogStore(s => s.closeDialog)

  const handleOpenDialog = useCallback(() => {
    openDialog('Nuevo contacto', <AddContactForm onSuccess={closeDialog} />)
  }, [openDialog, closeDialog])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleOpenDialog}
            variant="ghost"
            size="sm"
            aria-label="Agregar contacto"
          >
            <UserPlus className="size-4" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>Nuevo contacto</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
