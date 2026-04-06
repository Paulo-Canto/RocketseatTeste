import { cx } from '@ui/variants'

export type DataGridFooterProps = {
  summary?: React.ReactNode
  className?: string
}

export function DataGridFooter({ summary, className }: DataGridFooterProps) {
  if (!summary) return null
  return (
    <div data-slot="data-grid-footer" className={cx('flex items-center justify-end border-t border-zinc-200 pt-2 text-sm text-zinc-600', className)}>
      {summary}
    </div>
  )
}
