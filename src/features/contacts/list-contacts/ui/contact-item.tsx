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

  const handleStartChat = () => {
    onStartChat(contact)
  }

  const handleDelete = () => {
    deleteContact(contact.id)
  }

  return (
    <div className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary">
      {/* INFO */}
      <div className="min-w-0 flex flex-1 flex-col">
        <span className="truncate text-sm font-medium text-foreground">{contact.alias}</span>

        <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
          <Phone className="size-3 shrink-0" />
          <span className="truncate">{contact.phone}</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex shrink-0 items-center gap-1 opacity-80 transition group-hover:opacity-100">
        {/* CHAT */}
        <button
          onClick={handleStartChat}
          className="flex size-8 items-center justify-center rounded-lg transition hover:bg-primary hover:text-primary-foreground"
          aria-label="Iniciar chat"
        >
          <MessageSquarePlus className="size-4" />
        </button>

        {/* DELETE */}
        <DestructiveConfirmModal
          trigger={
            <button
              className="flex size-8 items-center justify-center rounded-lg transition hover:bg-destructive/10 hover:text-destructive"
              aria-label="Eliminar contacto"
            >
              <Trash2 className="size-4" />
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
