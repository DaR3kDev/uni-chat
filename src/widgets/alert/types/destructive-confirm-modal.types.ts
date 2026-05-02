import type { ReactNode } from 'react'

export interface DestructiveConfirmModalProps {
  trigger: ReactNode

  title: string
  description: ReactNode

  confirmText?: string
  cancelText?: string

  onConfirm: () => void | Promise<void>
}
