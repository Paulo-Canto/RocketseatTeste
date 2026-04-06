import { forwardRef } from 'react'
import { cx } from '@ui/variants'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cx(
        'flex min-h-[80px] w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
})
