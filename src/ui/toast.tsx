import { cx } from '@ui/variants'

export type ToastVariant = 'default' | 'success' | 'destructive'

export type ToastPayload = {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
}

export function ToastView({ toast }: { toast: ToastPayload }) {
  return (
    <div
      data-slot="toast"
      data-variant={toast.variant ?? 'default'}
      className={cx(
        'pointer-events-auto rounded-md border px-3 py-2 text-sm shadow-md',
        toast.variant === 'destructive' ? 'border-red-200 bg-red-50 text-red-900' : 'border-zinc-200 bg-white text-zinc-900',
      )}
      role="status"
    >
      <div className="font-medium">{toast.title}</div>
      {toast.description ? <div className="text-xs opacity-80">{toast.description}</div> : null}
    </div>
  )
}
