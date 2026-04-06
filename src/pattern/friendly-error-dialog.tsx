import { buttonVariants } from '@ui/button.variants'
import { Dialog, DialogClose, DialogContent } from '@ui/dialog'
import { cx } from '@ui/variants'
import type { FriendlyError } from '@core/http-resource'

export type FriendlyErrorDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  error: FriendlyError | null
}

export function FriendlyErrorDialog({ open, onOpenChange, error }: FriendlyErrorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title={error?.title ?? 'Error'} description={error?.detail}>
        <div className="flex justify-end gap-2">
          <DialogClose className={cx(buttonVariants({ variant: 'secondary' }))}>Close</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
