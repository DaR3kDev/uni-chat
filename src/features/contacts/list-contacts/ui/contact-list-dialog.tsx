import { BookOpen } from 'lucide-react'
import { useDialogStore } from '@/widgets/dialog/store/dialogStore'
import { Button } from '@/shared/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'
import type { Contact } from '@/entities/contact/types/contact.types'
import { ContactDialogContent } from './contact-dialog-content'

interface ContactListDialogProps {
  onStartChat: (contact: Contact) => void
  onDeleteContact: (contactId: string) => void
}

export function ContactListDialog({ onStartChat, onDeleteContact }: ContactListDialogProps) {
  const { openDialog, closeDialog } = useDialogStore()

  const handleOpen = () => {
    openDialog(
      'Contactos',
      <ContactDialogContent
        onStartChat={onStartChat}
        onDeleteContact={onDeleteContact}
        closeDialog={closeDialog}
      />,
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleOpen} variant="ghost" size="sm">
            <BookOpen className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Contactos</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
