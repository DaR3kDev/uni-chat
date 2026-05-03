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
    <div className="flex flex-col w-full sm:max-w-md max-h-[85dvh] bg-background rounded-2xl overflow-hidden shadow-xl border border-border/40">
      {/* HEADER SEARCH */}
      <div className="px-4 pt-4 pb-3 border-b border-border/30 bg-background/80 backdrop-blur">
        <div
          className="
          flex items-center gap-2
          rounded-2xl
          bg-secondary/60
          px-3 py-2
          border border-transparent
          focus-within:border-primary/30
          transition
        "
        >
          <Search className="size-4 text-muted-foreground shrink-0" />

          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar contacto..."
            className="
              w-full bg-transparent text-sm outline-none
              placeholder:text-muted-foreground/70
            "
          />
        </div>

        {/* small hint */}
        <p className="mt-2 text-[11px] text-muted-foreground">
          {contacts.length} contactos disponibles
        </p>
      </div>

      {/* LIST */}
      <ScrollArea className="flex-1 min-h-0 px-2 py-2">
        {filteredContacts.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
            No hay contactos
          </div>
        ) : (
          <ContactList contacts={filteredContacts} />
        )}
      </ScrollArea>
    </div>
  )
}
