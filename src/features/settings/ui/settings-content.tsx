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
  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-secondary'

const SECTION_TITLE_CLASS = 'px-2 pb-2 text-[10px] uppercase tracking-wide text-muted-foreground'

const ACTIVE_ITEM_CLASS = 'bg-secondary'

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
      console.error('Logout error:', error)
    } finally {
      authStorage.clear()
      clearAuth()
      resetDialogs()
      queryClient.clear()

      navigate({ to: '/login', replace: true })
      toast.success('Sesión cerrada correctamente')
    }
  }, [clearAuth, resetDialogs, navigate])

  return (
    <div className="flex h-full w-full flex-col">
      {/* USER HEADER */}
      <section className="flex flex-col items-center gap-2 px-4 py-6 border-b border-border/40">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-primary shadow-sm">
          <Users className="size-8 text-white" />
        </div>

        <div className="text-center">
          <h4 className="text-base font-semibold">{user?.username ?? 'Usuario'}</h4>
          <span className="text-xs text-muted-foreground">{user?.phone ?? ''}</span>
        </div>
      </section>

      {/* CONTENT */}
      <div className="flex flex-col gap-6 px-3 py-4">
        {/* THEME */}
        <section className="flex flex-col gap-1">
          <span className={SECTION_TITLE_CLASS}>Apariencia</span>

          <button
            onClick={() => handleThemeChange('light')}
            className={`${ITEM_CLASS} ${theme === 'light' ? ACTIVE_ITEM_CLASS : ''}`}
          >
            <Sun className="size-4" />
            Modo claro
          </button>

          <button
            onClick={() => handleThemeChange('dark')}
            className={`${ITEM_CLASS} ${theme === 'dark' ? ACTIVE_ITEM_CLASS : ''}`}
          >
            <Moon className="size-4" />
            Modo oscuro
          </button>
        </section>

        {/* ACCOUNT */}
        <section className="flex flex-col gap-1">
          <span className={SECTION_TITLE_CLASS}>Cuenta</span>

          <button
            onClick={handleLogout}
            className={`${ITEM_CLASS} text-red-500 hover:bg-red-500/10`}
          >
            <LogOut className="size-4" />
            Cerrar sesión
          </button>
        </section>
      </div>
    </div>
  )
}
