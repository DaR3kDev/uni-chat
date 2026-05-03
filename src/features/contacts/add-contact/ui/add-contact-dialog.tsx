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
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            onClick={handleOpenDialog}
            variant="ghost"
            size="icon"
            aria-label="Agregar contacto"
            className="
              h-8 w-8 rounded-full
              hover:bg-muted/60
              transition
              active:scale-95
            "
          >
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </Button>
        </TooltipTrigger>

        <TooltipContent side="bottom" className="text-xs px-2 py-1">
          Nuevo contacto
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
