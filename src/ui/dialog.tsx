import { Dialog as DialogParts } from '@base-ui/react/dialog'
import { cx } from '@ui/variants'

export const Dialog = DialogParts.Root

export function DialogTrigger(props: React.ComponentProps<typeof DialogParts.Trigger>) {
  return <DialogParts.Trigger {...props} />
}

export function DialogContent({
  className,
  children,
  title,
  description,
}: {
  className?: string
  children: React.ReactNode
  title: string
  description?: string
}) {
  return (
    <DialogParts.Portal>
      <DialogParts.Backdrop className="fixed inset-0 z-50 bg-black/40 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
      <DialogParts.Popup
        className={cx(
          'fixed left-1/2 top-1/2 z-50 w-[min(100%-2rem,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-200 bg-white p-6 shadow-lg outline-none',
          className,
        )}
      >
        <DialogParts.Title className="text-lg font-semibold">{title}</DialogParts.Title>
        {description ? (
          <DialogParts.Description className="mt-1 text-sm text-zinc-600">{description}</DialogParts.Description>
        ) : null}
        <div className="mt-4">{children}</div>
      </DialogParts.Popup>
    </DialogParts.Portal>
  )
}

export function DialogClose(props: React.ComponentProps<typeof DialogParts.Close>) {
  return <DialogParts.Close {...props} />
}
