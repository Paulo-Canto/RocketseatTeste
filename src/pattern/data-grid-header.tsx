import { cx } from '@ui/variants'

export type DataGridHeaderProps = {
  title: string
  actions?: React.ReactNode
  className?: string
}

export function DataGridHeader({ title, actions, className }: DataGridHeaderProps) {
  return (
    <div data-slot="data-grid-header" className={cx('flex items-center justify-between gap-2', className)}>
      <h2 className="text-base font-semibold">{title}</h2>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  )
}
