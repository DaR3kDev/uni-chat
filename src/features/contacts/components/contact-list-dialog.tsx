import { useState, useMemo } from 'react'
import { BookOpen, Search } from 'lucide-react'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { useDialogStore } from '@/widgets/dialog/store/dialogStore'
import type { Contact } from '@/shared/lib/chat-data'
import { ContactList } from './contact-list'

interface ContactListDialogProps {
  contacts: Contact[]
  onStartChat: (contact: Contact) => void
  onDeleteContact: (contactId: string) => void
}

export function ContactListDialog({
  contacts,
  onStartChat,
  onDeleteContact,
}: ContactListDialogProps) {
  const { openDialog, closeDialog } = useDialogStore()
  const [search, setSearch] = useState('')

  const filteredContacts = useMemo(
    () => contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase())),
    [contacts, search],
  )

  const handleOpen = () => {
    openDialog(
      'Contactos',
      <div className="flex flex-col max-h-[85dvh] w-full sm:max-w-md">
        {/* Search */}
        <div className="px-5 pt-3 pb-2">
          <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
            <Search className="size-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Buscar contacto..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Contact List */}
        <ScrollArea className="flex-1 min-h-0 px-2">
          <ContactList
            contacts={filteredContacts}
            onStartChat={(contact: Contact) => {
              onStartChat(contact)
              closeDialog()
            }}
            onDeleteContact={onDeleteContact}
          />
        </ScrollArea>
      </div>,
    )
  }

  return (
    <button
      onClick={handleOpen}
      className="flex size-8 items-center justify-center rounded-xl text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
      aria-label="Contactos"
    >
      <BookOpen className="size-4" />
    </button>
  )
}
