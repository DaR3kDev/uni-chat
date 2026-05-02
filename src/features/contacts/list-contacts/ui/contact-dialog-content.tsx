import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'

import { ScrollArea } from '@/shared/ui/scroll-area'
import { useContacts } from '../hooks/use-contacts'
import { ContactList } from './contact-list'

export function ContactDialogContent() {
  const [search, setSearch] = useState('')

  const { data: contacts = [] } = useContacts(search)

  const filteredContacts = useMemo(() => {
    const query = search.toLowerCase().trim()

    if (!query) return contacts

    return contacts.filter(contact => contact.username.toLowerCase().includes(query))
  }, [contacts, search])

  return (
    <div className="flex flex-col w-full sm:max-w-md max-h-[85dvh]">
      {/* SEARCH */}
      <div className="px-5 pt-3 pb-2 border-b border-border/40">
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
        <ContactList contacts={filteredContacts} />
      </ScrollArea>
    </div>
  )
}
