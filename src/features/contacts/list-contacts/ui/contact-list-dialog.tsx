import { useCallback } from 'react'
import { BookOpen } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'

import { useDialogStore } from '@/widgets/dialog/store/dialogStore'
import { ContactDialogContent } from './contact-dialog-content'

export function ContactListDialog() {
  const openDialog = useDialogStore(s => s.openDialog)

  const handleOpenDialog = useCallback(() => {
    openDialog('Contactos', <ContactDialogContent />)
  }, [openDialog])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleOpenDialog} variant="ghost" size="sm" aria-label="Abrir contactos">
            <BookOpen className="size-4" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>Contactos</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
