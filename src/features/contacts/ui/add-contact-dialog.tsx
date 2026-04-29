import { UserPlus } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'

import { useDialogStore } from '@/widgets/dialog/store/dialogStore'
import { AddContactForm } from './add-contact-form'

export function AddContactDialog() {
  const { openDialog, closeDialog } = useDialogStore()

  const handleOpen = () => openDialog('Nuevo contacto', <AddContactForm onSuccess={closeDialog} />)

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
