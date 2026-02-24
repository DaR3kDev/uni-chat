import { Users, PinOff, BellRing, SettingsIcon, Sun, Moon, Monitor } from 'lucide-react'
import { useDialogStore } from '@/widgets/dialog/store/dialogStore'
import { Button } from '@/shared/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'
import { useTheme } from '@/app/providers/theme-provider'

export function InfoUserDialog() {
  const { openDialog } = useDialogStore()
  const { theme, setTheme } = useTheme()

  const handleOpen = () => {
    openDialog(
      'Configuración',
      <div className="flex h-full w-full flex-col overflow-hidden">
        {/* Perfil */}
        <div className="flex flex-col items-center px-4 py-6">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-primary">
            <Users className="size-8" />
          </div>

          <h4 className="mt-3 text-base font-semibold text-card-foreground">Juan Pérez</h4>
        </div>

        {/* Apariencia */}
        <div className="flex flex-col gap-1 px-3 pt-4">
          <span className="px-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Apariencia
          </span>

          <button
            onClick={() => setTheme('light')}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-secondary ${
              theme === 'light' ? 'bg-secondary' : ''
            }`}
          >
            <Sun className="size-4 text-muted-foreground" />
            Modo claro
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-secondary ${
              theme === 'dark' ? 'bg-secondary' : ''
            }`}
          >
            <Moon className="size-4 text-muted-foreground" />
            Modo oscuro
          </button>
        </div>

        {/* Acciones */}
        <div className="flex flex-col gap-1 px-3 pt-5">
          <span className="px-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Acciones
          </span>

          <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-secondary">
            <PinOff className="size-4 text-muted-foreground" />
            Desfijar conversación
          </button>

          <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-secondary">
            <BellRing className="size-4 text-muted-foreground" />
            Activar notificaciones
          </button>
        </div>
      </div>,
    )
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
