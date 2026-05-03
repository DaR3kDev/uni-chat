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
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            onClick={handleOpenDialog}
            variant="ghost"
            size="icon"
            aria-label="Contactos"
            className="
              h-8 w-8 rounded-full
              hover:bg-muted/60
              transition
              active:scale-95
            "
          >
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </Button>
        </TooltipTrigger>

        <TooltipContent side="bottom" className="text-xs px-2 py-1">
          Contactos
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
