import { SettingsIcon } from 'lucide-react'
import { useDialogStore } from '@/widgets/dialog/store/dialogStore'
import { Button } from '@/shared/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'
import { SettingsContent } from './settings-content'

export function InfoUserDialog() {
  const { openDialog } = useDialogStore()

  const handleOpen = () => {
    openDialog('Configuración', <SettingsContent />)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleOpen} variant="ghost" size="sm">
            <SettingsIcon className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Configuración</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
