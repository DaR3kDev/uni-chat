import { create } from 'zustand'
import type { Contact } from '@/shared/lib/chat-data'

type ChatState = {
  activeContact: Contact | null
  setActiveContact: (contact: Contact) => void
  clearActiveContact: () => void
}

export const useChatStore = create<ChatState>(set => ({
  activeContact: null,

  setActiveContact: contact => set({ activeContact: contact }),

  clearActiveContact: () => set({ activeContact: null }),
}))
