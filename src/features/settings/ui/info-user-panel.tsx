import { useCallback } from 'react'
import { SettingsIcon } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'

import { useDialogStore } from '@/widgets/dialog/store/dialogStore'
import { SettingsContent } from './settings-content'

export function InfoUserDialog() {
  const openDialog = useDialogStore(s => s.openDialog)

  const handleOpenDialog = useCallback(() => {
    openDialog('Configuración', <SettingsContent />)
  }, [openDialog])

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            onClick={handleOpenDialog}
            variant="ghost"
            size="icon"
            aria-label="Configuración"
            className="
              h-8 w-8 rounded-full
              hover:bg-muted/60
              transition
              active:scale-95
            "
          >
            <SettingsIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        </TooltipTrigger>

        <TooltipContent side="bottom" className="text-xs px-2 py-1">
          Configuración
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
