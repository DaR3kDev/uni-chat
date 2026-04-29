import { MessageSquarePlus, Phone, Trash2 } from 'lucide-react'
import type { Contact } from '@/shared/lib/chat-data'
import { AlertDialogGeneric } from '@/widgets/alert/ui/alert-dialog-generic'

interface ContactItemProps {
  contact: Contact
  onStartChat: (contact: Contact) => void
  onDeleteContact: (id: string) => void
}

export function ContactItem({ contact, onStartChat, onDeleteContact }: ContactItemProps) {
  return (
    <div className="group flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-secondary transition-colors">
      {/* Avatar */}
      <div className="relative shrink-0">
        <div
          className={`flex size-10 items-center justify-center rounded-xl text-xs font-semibold ${contact.avatarColor}`}
        >
          {contact.avatar}
        </div>
        {contact.online && (
          <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-card bg-emerald-500" />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col min-w-0">
        <span className="truncate text-sm font-medium text-foreground">{contact.name}</span>
        <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
          <Phone className="size-3" />
          <span className="truncate">{contact.phone}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1">
        <button
          onClick={() => onStartChat(contact)}
          className="flex size-8 items-center justify-center rounded-lg hover:bg-primary hover:text-primary-foreground"
          aria-label={`Iniciar chat con ${contact.name}`}
        >
          <MessageSquarePlus className="size-4" />
        </button>

        <AlertDialogGeneric
          trigger={<Trash2 className="size-4" />}
          triggerClassName="flex size-8 items-center justify-center rounded-lg hover:bg-destructive/10 hover:text-destructive"
          title="Eliminar contacto"
          description={`Se eliminará a ${contact.name} de tus contactos y su conversación asociada. Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={() => onDeleteContact(contact.id)}
        />
      </div>
    </div>
  )
}
