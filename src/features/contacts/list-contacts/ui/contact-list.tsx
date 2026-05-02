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
      <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
        <p className="text-sm text-muted-foreground">No hay contactos</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1 pb-4">
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} onStartChat={handleStartChat} />
      ))}
    </div>
  )
}
