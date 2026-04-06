import { cx } from '@ui/variants'

export type LoadingProps = {
  className?: string
  label?: string
}

export function Loading({ className, label = 'Loading' }: LoadingProps) {
  return (
    <div data-slot="loading" className={cx('flex items-center gap-2 text-sm text-zinc-600', className)} role="status" aria-live="polite">
      <span className="size-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
      <span>{label}</span>
    </div>
  )
}
