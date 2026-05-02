import { useMemo, useState, useCallback } from 'react'
import { Search } from 'lucide-react'

import { ScrollArea } from '@/shared/ui/scroll-area'

import { AddContactDialog } from '@/features/contacts/add-contact/ui/add-contact-dialog'
import { ContactListDialog } from '@/features/contacts/list-contacts/ui/contact-list-dialog'
import { InfoUserDialog } from '@/features/settings/ui/info-user-panel'

import { FiltersComponents } from '@/features/filters/components/filters-components'
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
    const query = search.trim().toLowerCase()

    if (!query) return conversations

    return conversations.filter(c => c.username?.toLowerCase().includes(query))
  }, [conversations, search])

  const handleSelectConversation = useCallback(
    (conversation: Conversation) => {
      setActiveConversationId(conversation.conversationId)
      onSelectConversation(conversation)
    },
    [onSelectConversation],
  )

  return (
    <aside className="flex h-full w-full flex-col overflow-hidden bg-card">
      {/* HEADER */}
      <header className="flex items-center justify-between border-b border-border/40 px-4 py-3">
        <div className="flex items-center gap-3">
          <img src="./img/logo.webp" alt="UniChat Logo" className="h-10 w-10 object-contain" />

          <div className="leading-tight">
            <h1 className="text-lg font-semibold text-card-foreground">UniChat</h1>
            <p className="text-xs text-muted-foreground">Mensajes</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ContactListDialog />
          <AddContactDialog />
          <InfoUserDialog />
        </div>
      </header>

      {/* SEARCH */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
          <Search className="size-4 text-muted-foreground" />

          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar conversaciones..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* FILTERS */}
      <div className="px-2">
        <FiltersComponents />
      </div>

      {/* CONVERSATIONS */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-1 p-2">
          {filteredConversations.length === 0 ? (
            <div className="flex min-h-[200px] items-center justify-center">
              <p className="text-sm text-muted-foreground">No hay conversaciones</p>
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
