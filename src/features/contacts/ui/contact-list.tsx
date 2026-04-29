import type { Contact } from '../hooks/use-contacts'
import { ContactItem } from './contact-item'

interface ContactListProps {
  contacts: Contact[]
  onStartChat: (contact: Contact) => void
  onDeleteContact: (id: string) => void
}

export function ContactList({ contacts, onStartChat, onDeleteContact }: ContactListProps) {
  if (!contacts.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-muted-foreground">No hay contactos</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1 pb-4">
      {contacts.map(contact => (
        <ContactItem
          key={contact._id}
          contact={contact}
          onStartChat={onStartChat}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </div>
  )
}
