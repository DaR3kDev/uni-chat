import type { ReactNode } from 'react'

export interface DropdownItem {
  id: string
  label: string
  icon?: ReactNode
  onClick: () => void
  destructive?: boolean
  disabled?: boolean
}

export interface DropdownGenericProps {
  trigger: ReactNode
  items: DropdownItem[]

  /** Clases adicionales para el contenido del dropdown */
  contentClassName?: string

  /** Alineación del menú respecto al trigger */
  align?: 'start' | 'end'
}
