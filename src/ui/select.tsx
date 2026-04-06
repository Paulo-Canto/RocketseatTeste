import { forwardRef } from 'react'
import { cx } from '@ui/variants'

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      data-slot="select"
      className={cx(
        'flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline focus-visible:outline-2 disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
})
