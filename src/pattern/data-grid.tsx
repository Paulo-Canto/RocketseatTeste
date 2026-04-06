import { cx } from '@ui/variants'
import { dataGridShellVariants } from '@pattern/data-grid.variants'

export type DataGridProps = {
  children: React.ReactNode
  className?: string
  density?: 'default' | 'compact'
}

export function DataGrid({ children, className, density }: DataGridProps) {
  return (
    <div data-slot="data-grid" className={cx(dataGridShellVariants({ density }), className)}>
      {children}
    </div>
  )
}
