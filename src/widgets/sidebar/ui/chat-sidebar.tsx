import { Search } from 'lucide-react'
import { AddContactDialog } from '@/features/contacts/components/add-contact-dialog'
import { ContactListDialog } from '@/features/contacts/components/contact-list-dialog'
import type { Chat, Contact } from '@/shared/lib/chat-data'

interface ChatSidebarProps {
  chats: Chat[]
  contacts: Contact[]
  activeChatId: string | null
  onSelectChat: (chatId: string) => void
  onAddContact: (name: string, phone: string) => void
  onStartChat: (contact: Contact) => void
  onDeleteChat: (chatId: string) => void
  onTogglePin: (chatId: string) => void
  onToggleMute: (chatId: string) => void
  onDeleteContact: (contactId: string) => void
}

export default function ChatSidebar({ contacts, onStartChat, onDeleteContact }: ChatSidebarProps) {
  const FILTERS = [
    { key: 'all', label: 'Todos' },
    { key: 'unread', label: 'No leidos' },
    { key: 'personal', label: 'Personal' },
    { key: 'work', label: 'Trabajo' },
    { key: 'group', label: 'Grupos' },
  ] as const

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-card">
      {/* Profile header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-xs font-bold text-primary-foreground">
            T
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold text-card-foreground">Mensajes</h1>
            <p className="truncate text-[11px] text-muted-foreground">Disponible</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <ContactListDialog
            contacts={contacts}
            onStartChat={onStartChat}
            onDeleteContact={onDeleteContact}
          />
          <AddContactDialog />
        </div>
      </div>

      <div className="px-4 py-2.5">
        <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar conversaciones..."
            className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
    </div>
  )
}
