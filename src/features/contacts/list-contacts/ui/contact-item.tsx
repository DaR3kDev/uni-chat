import { MessageSquarePlus, Phone, Trash2 } from 'lucide-react'
import { AlertDialogGeneric } from '@/widgets/alert/ui/alert-dialog-generic'
import type { Contact } from '@/entities/contact/types/contact.types'
import { useDeleteContact } from '../hooks/use-delete-contact'

interface ContactItemProps {
  contact: Contact
  onStartChat: (contact: Contact) => void
}

export function ContactItem({ contact, onStartChat }: ContactItemProps) {
  const { mutate: deleteContact } = useDeleteContact()

  return (
    <div className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary">
      {/* INFO */}
      <div className="flex flex-1 flex-col min-w-0">
        <span className="truncate text-sm font-medium text-foreground">{contact.alias}</span>

        <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
          <Phone className="size-3" />
          <span className="truncate">{contact.phone}</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex shrink-0 items-center gap-1 opacity-80 group-hover:opacity-100 transition">
        {/* CHAT */}
        <button
          onClick={() => onStartChat(contact)}
          className="flex size-8 items-center justify-center rounded-lg hover:bg-primary hover:text-primary-foreground transition"
        >
          <MessageSquarePlus className="size-4" />
        </button>

        {/* DELETE */}
        <AlertDialogGeneric
          trigger={<Trash2 className="size-4" />}
          triggerClassName="flex size-8 items-center justify-center rounded-lg hover:bg-destructive/10 hover:text-destructive transition"
          title="Eliminar contacto"
          description={`Se eliminará a ${contact.alias}. Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={() => deleteContact(contact.id)}
        />
      </div>
    </div>
  )
}
