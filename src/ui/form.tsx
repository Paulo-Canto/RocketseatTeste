import { cx } from '@ui/variants'

export function FormLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label data-slot="form-label" className={cx('text-sm font-medium leading-none', className)} {...props} />
}

export function FormField({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="form-field" className={cx('grid gap-2', className)} {...props} />
}

export function FormMessage({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p data-slot="form-message" className={cx('text-sm text-red-600', className)} {...props} />
}

export function FormDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p data-slot="form-description" className={cx('text-sm text-zinc-500', className)} {...props} />
}
