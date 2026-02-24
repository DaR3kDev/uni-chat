import { useTheme } from '@/app/providers/theme-provider'
import { Moon, Sun, Users } from 'lucide-react'

export function SettingsContent() {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (value: 'light' | 'dark') => {
    if (theme !== value) setTheme(value)
  }

  const itemClass =
    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-secondary'

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <section className="flex flex-col items-center px-4 py-6">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-primary">
          <Users className="size-8" />
        </div>

        <h4 className="mt-3 text-base font-semibold text-card-foreground">Juan Pérez</h4>
      </section>

      <section className="flex flex-col gap-1 px-3 pt-4">
        <span className="px-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Apariencia
        </span>

        <button
          onClick={() => handleThemeChange('light')}
          className={`${itemClass} ${theme === 'light' ? 'bg-secondary' : ''}`}
        >
          <Sun className="size-4 text-muted-foreground" />
          Modo claro
        </button>

        <button
          onClick={() => handleThemeChange('dark')}
          className={`${itemClass} ${theme === 'dark' ? 'bg-secondary' : ''}`}
        >
          <Moon className="size-4 text-muted-foreground" />
          Modo oscuro
        </button>
      </section>
    </div>
  )
}
