import { Search } from 'lucide-react'
import { AddContactDialog } from '@/features/contacts/components/add-contact-dialog'
import { ContactListDialog } from '@/features/contacts/components/contact-list-dialog'
import { stories, type Chat, type Contact } from '@/shared/lib/chat-data'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { ChatPreviewItem } from '@/features/contacts/components/chat-preview-item'
import { StoriesRow } from '@/features/stories/components/stories-row'
import { FiltersComponents } from '@/features/filters/components/filters-components'
import { InfoUserDialog } from '@/features/settings/components/info-user-panel'

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
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden bg-card 
      sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 pt-3 pb-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img
            src="./img/logo.png"
            alt="UniChat Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
          />

          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl lg:text-2xl text-card-foreground truncate">
              UniChat
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Mensajes</p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <ContactListDialog
            contacts={contacts}
            onStartChat={onStartChat}
            onDeleteContact={onDeleteContact}
          />
          <AddContactDialog />
          <InfoUserDialog />
        </div>
      </div>

      {/* Search */}
      <div className="px-3 sm:px-4 py-2">
        <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* Stories */}
      <div className="px-2 sm:px-3">
        <StoriesRow stories={stories} />
      </div>

      {/* Filters */}
      <FiltersComponents />

      {/* Chats */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-1 sm:p-2">
          {contacts.map(contact => (
            <ChatPreviewItem
              key={contact.id}
              chat={{
                id: contact.id,
                name: contact.name,
                avatar: contact.avatar,
                avatarColor: contact.avatarColor,
                pinned: false,
                muted: false,
                online: contact.online,
                lastMessage: '',
                time: '',
                unread: 0,
                messages: [],
                category: 'personal',
              }}
              active={false}
              onSelect={() => {}}
              onDeleteChat={() => {}}
              onTogglePin={() => {}}
              onToggleMute={() => {}}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
