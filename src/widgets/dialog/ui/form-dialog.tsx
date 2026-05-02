import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { useDialogStore } from '../store/dialogStore'

export function FormDialog() {
  const { open, closeDialog, title, content } = useDialogStore()

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      closeDialog()
    }
  }

  const handleInteractOutside = (event: Event) => {
    event.preventDefault()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent onInteractOutside={handleInteractOutside}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="mt-2">{content}</div>
      </DialogContent>
    </Dialog>
  )
}
