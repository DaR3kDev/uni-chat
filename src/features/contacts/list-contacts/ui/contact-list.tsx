import type { Contact } from '@/entities/contact/types/contact.types'

import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'

import { ContactItem } from './contact-item'
import { useDialogStore } from '@/widgets/dialog/store/dialogStore'
import { useCreateDirectConversation } from '../hooks/use-create-direct-conversation'

interface ContactListProps {
  contacts: Contact[]
}

export function ContactList({ contacts }: ContactListProps) {
  const navigate = useNavigate()
  const closeDialog = useDialogStore(s => s.closeDialog)
  const { mutate: createConversation } = useCreateDirectConversation()

  const handleStartChat = useCallback(
    (contact: Contact) => {
      createConversation(
        { contactUserId: contact.contactUserId },
        {
          onSuccess: () => {
            closeDialog()

            navigate({
              to: '/chat',
            })
          },
          onError: error => {
            console.error('Error creating conversation:', error)
          },
        },
      )
    },
    [createConversation, closeDialog, navigate],
  )

  if (!contacts.length) {
    return (
      <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 text-center">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
          <span className="text-xs">👥</span>
        </div>

        <p className="text-sm font-medium text-muted-foreground">No hay contactos</p>

        <span className="text-xs text-muted-foreground">
          Agrega personas para empezar a chatear
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1 pb-3">
      {contacts.map(contact => (
        <div key={contact.id} className="transition active:scale-[0.99]">
          <ContactItem contact={contact} onStartChat={handleStartChat} />
        </div>
      ))}
    </div>
  )
}
