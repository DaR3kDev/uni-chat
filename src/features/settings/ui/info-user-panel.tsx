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
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleOpenDialog}
            variant="ghost"
            size="sm"
            aria-label="Abrir configuración"
          >
            <SettingsIcon className="size-4" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>Configuración</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
