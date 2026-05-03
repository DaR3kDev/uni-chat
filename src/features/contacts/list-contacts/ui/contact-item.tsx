import { MessageSquarePlus, Phone, Trash2 } from 'lucide-react'

import type { Contact } from '@/entities/contact/types/contact.types'
import { useDeleteContact } from '../hooks/use-delete-contact'
import { DestructiveConfirmModal } from '@/widgets/alert/ui/destructive-confirm-modal'

interface ContactItemProps {
  contact: Contact
  onStartChat: (contact: Contact) => void
}

export function ContactItem({ contact, onStartChat }: ContactItemProps) {
  const { mutate: deleteContact } = useDeleteContact()

  const handleStartChat = () => onStartChat(contact)
  const handleDelete = () => deleteContact(contact.id)

  return (
    <div
      className="
        group flex items-center gap-3
        rounded-xl px-3 py-2.5
        transition
        hover:bg-muted/60
        active:scale-[0.99]
      "
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <span className="text-xs font-medium">{contact.alias?.[0]?.toUpperCase() ?? '?'}</span>
      </div>

      {/* INFO */}
      <div className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{contact.alias}</span>

        <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
          <Phone className="h-3 w-3 shrink-0" />
          <span className="truncate">{contact.phone}</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div
        className="
          flex shrink-0 items-center gap-1
          opacity-70 group-hover:opacity-100
          transition
        "
      >
        {/* CHAT */}
        <button
          onClick={handleStartChat}
          className="
            flex h-8 w-8 items-center justify-center
            rounded-lg
            hover:bg-primary hover:text-primary-foreground
            transition
            active:scale-95
          "
          aria-label="Iniciar chat"
        >
          <MessageSquarePlus className="h-4 w-4" />
        </button>

        {/* DELETE */}
        <DestructiveConfirmModal
          trigger={
            <button
              className="
                flex h-8 w-8 items-center justify-center
                rounded-lg
                hover:bg-destructive/10 hover:text-destructive
                transition
                active:scale-95
              "
              aria-label="Eliminar contacto"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          }
          title="Eliminar contacto"
          description={`Se eliminará a ${contact.alias}. Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={handleDelete}
        />
      </div>
    </div>
  )
}
