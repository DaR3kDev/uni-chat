import { useCallback } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Moon, Sun, Users, LogOut } from 'lucide-react'
import { toast } from 'sonner'

import { useTheme } from '@/app/providers/theme-provider'
import { authStorage } from '@/entities/auth/model/storage/auth-storage'
import { useAuthStore } from '@/entities/auth/model/store/auth.store'
import { queryClient } from '@/shared/lib/query-client'
import { logout } from '@/entities/auth/api/auth.api'
import { useDialogStore } from '@/widgets/dialog/store/dialogStore'

const ITEM_CLASS =
  'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition hover:bg-muted/60 active:scale-[0.98]'

const SECTION_TITLE = 'px-2 pb-2 text-[10px] uppercase tracking-wider text-muted-foreground'

const ACTIVE = 'bg-muted'

export function SettingsContent() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  const user = useAuthStore(s => s.user)
  const clearAuth = useAuthStore(s => s.clear)
  const resetDialogs = useDialogStore(s => s.reset)

  const handleThemeChange = useCallback(
    (value: 'light' | 'dark') => {
      if (theme !== value) setTheme(value)
    },
    [theme, setTheme],
  )

  const handleLogout = useCallback(async () => {
    try {
      await logout()
    } catch (error) {
      console.error(error)
    } finally {
      authStorage.clear()
      clearAuth()
      resetDialogs()
      queryClient.clear()

      navigate({ to: '/login', replace: true })
      toast.success('Sesión cerrada')
    }
  }, [clearAuth, resetDialogs, navigate])

  return (
    <div className="flex h-full flex-col">
      {/* USER HEADER */}
      <section className="flex flex-col items-center gap-2 px-4 py-5 border-b">
        <div className="h-18 w-18 rounded-2xl bg-primary flex items-center justify-center shadow-sm">
          <Users className="h-7 w-7 text-white" />
        </div>

        <div className="text-center">
          <h4 className="text-sm font-semibold">{user?.username ?? 'Usuario'}</h4>

          <p className="text-[11px] text-muted-foreground">{user?.phone ?? ''}</p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="flex flex-col gap-5 px-3 py-4">
        {/* THEME */}
        <section className="flex flex-col gap-1">
          <span className={SECTION_TITLE}>Apariencia</span>

          <button
            onClick={() => handleThemeChange('light')}
            className={`${ITEM_CLASS} ${theme === 'light' ? ACTIVE : ''}`}
          >
            <Sun className="h-4 w-4" />
            Modo claro
          </button>

          <button
            onClick={() => handleThemeChange('dark')}
            className={`${ITEM_CLASS} ${theme === 'dark' ? ACTIVE : ''}`}
          >
            <Moon className="h-4 w-4" />
            Modo oscuro
          </button>
        </section>

        {/* ACCOUNT */}
        <section className="flex flex-col gap-1">
          <span className={SECTION_TITLE}>Cuenta</span>

          <button
            onClick={handleLogout}
            className={`
              ${ITEM_CLASS}
              text-red-500 hover:bg-red-500/10
            `}
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </section>
      </div>
    </div>
  )
}
