import { useMemo, useState, useCallback } from 'react'
import { Search } from 'lucide-react'

import { ScrollArea } from '@/shared/ui/scroll-area'

import { AddContactDialog } from '@/features/contacts/add-contact/ui/add-contact-dialog'
import { ContactListDialog } from '@/features/contacts/list-contacts/ui/contact-list-dialog'
import { InfoUserDialog } from '@/features/settings/ui/info-user-panel'

import { FiltersComponents } from '@/features/filters/ui/filters-components'
import { ConversationPreviewItem } from '@/features/contacts/list-contacts/ui/conversation-preview-item'

import type { Conversation } from '@/entities/conversation/types/conversation.types'
import { useConversations } from '@/features/contacts/list-contacts/hooks/use-conversations'

interface ChatSidebarProps {
  onSelectConversation: (conversation: Conversation) => void
}

export default function ChatSidebar({ onSelectConversation }: ChatSidebarProps) {
  const [search, setSearch] = useState('')
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)

  const { data: conversations = [] } = useConversations()

  const filteredConversations = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return conversations

    return conversations.filter(c => c.username?.toLowerCase().includes(q))
  }, [conversations, search])

  const handleSelectConversation = useCallback(
    (conversation: Conversation) => {
      setActiveConversationId(conversation.conversationId)
      onSelectConversation(conversation)
    },
    [onSelectConversation],
  )

  return (
    <aside className="flex h-full flex-col bg-background border-r">
      {/* HEADER */}
      <header className="flex items-center justify-between px-3 py-3 border-b bg-background/70 backdrop-blur">
        <div className="flex items-center gap-2">
          <img src="./img/logo.webp" alt="UniChat" className="h-9 w-9 object-contain" />

          <div className="leading-tight">
            <h1 className="text-sm font-semibold">UniChat</h1>
            <p className="text-[11px] text-muted-foreground">Mensajes</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <ContactListDialog />
          <AddContactDialog />
          <InfoUserDialog />
        </div>
      </header>

      {/* SEARCH */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2 focus-within:ring-2 focus-within:ring-primary/20 transition">
          <Search className="h-4 w-4 text-muted-foreground" />

          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar chats..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* FILTERS */}
      <div className="px-2">
        <FiltersComponents />
      </div>

      {/* LISTA */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-2 space-y-1">
          {filteredConversations.length === 0 ? (
            <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
              No hay conversaciones
            </div>
          ) : (
            filteredConversations.map(conversation => (
              <ConversationPreviewItem
                key={conversation.conversationId}
                conversation={conversation}
                active={activeConversationId === conversation.conversationId}
                onSelect={() => handleSelectConversation(conversation)}
                onDeleteConversation={() => {}}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </aside>
  )
}
