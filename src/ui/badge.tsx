import { cva } from '@ui/variants'
import { cx } from '@ui/variants'
import type { VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-zinc-900 text-white',
        secondary: 'border-transparent bg-zinc-100 text-zinc-900',
        outline: 'border-zinc-300 text-zinc-800',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span data-slot="badge" data-variant={variant ?? 'default'} className={cx(badgeVariants({ variant }), className)} {...props} />
  )
}
