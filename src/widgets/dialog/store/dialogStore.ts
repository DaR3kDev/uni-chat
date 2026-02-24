import type { ReactNode } from 'react'
import { create } from 'zustand'

interface DialogState {
  open: boolean
  title: string
  content: ReactNode
  openDialog: (title: string, content: ReactNode) => void
  closeDialog: () => void
}

export const useDialogStore = create<DialogState>(set => ({
  open: false,
  title: '',
  content: null,
  openDialog: (title, content) =>
    set({
      open: true,
      title,
      content,
    }),
  closeDialog: () =>
    set({
      open: false,
    }),
}))
