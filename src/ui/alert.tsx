import { cx } from '@ui/variants'

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'destructive'
}

export function Alert({ className, variant = 'default', ...props }: AlertProps) {
  return (
    <div
      role="alert"
      data-slot="alert"
      data-variant={variant}
      className={cx(
        'relative w-full rounded-lg border px-4 py-3 text-sm',
        variant === 'destructive' ? 'border-red-200 bg-red-50 text-red-900' : 'border-zinc-200 bg-zinc-50 text-zinc-900',
        className,
      )}
      {...props}
    />
  )
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className={cx('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx('text-sm opacity-90', className)} {...props} />
}
