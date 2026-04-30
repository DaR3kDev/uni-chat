import type { Contact } from '@/entities/contact/types/contact.types'
import { ContactItem } from './contact-item'

interface ContactListProps {
  contacts: Contact[]
  onStartChat: (contact: Contact) => void
}

export function ContactList({ contacts, onStartChat }: ContactListProps) {
  if (!contacts.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
        <p className="text-muted-foreground text-sm">No hay contactos</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1 pb-4">
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} onStartChat={onStartChat} />
      ))}
    </div>
  )
}
