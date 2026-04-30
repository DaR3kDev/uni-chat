import { useState } from 'react'
import { Search } from 'lucide-react'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { useContacts } from '../hooks/use-contacts'
import { ContactList } from './contact-list'
import type { Contact } from '@/entities/contact/types/contact.types'

interface ContactDialogContentProps {
  onStartChat: (contact: Contact) => void
  onDeleteContact: (id: string) => void
  closeDialog: () => void
}

export function ContactDialogContent({
  onStartChat,
  onDeleteContact,
  closeDialog,
}: ContactDialogContentProps) {
  const [search, setSearch] = useState('')
  const { data: contacts = [] } = useContacts(search)

  return (
    <div className="flex flex-col max-h-[85dvh] w-full sm:max-w-md">
      {/* SEARCH */}
      <div className="px-5 pt-3 pb-2">
        <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
          <Search className="size-4 text-muted-foreground shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar contacto..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* LIST */}
      <ScrollArea className="flex-1 min-h-0 px-2">
        <ContactList
          contacts={contacts}
          onStartChat={contact => {
            onStartChat(contact)
            closeDialog()
          }}
        />
      </ScrollArea>
    </div>
  )
}
