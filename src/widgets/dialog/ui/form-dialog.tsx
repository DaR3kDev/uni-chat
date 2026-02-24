import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { useDialogStore } from '../store/dialogStore'

export function FormDialog() {
  const { open, closeDialog, title, content } = useDialogStore()

  return (
    <Dialog
      open={open}
      onOpenChange={value => {
        if (!value) closeDialog()
      }}
    >
      <DialogContent onInteractOutside={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}
