import { forwardRef } from 'react'
import { buttonVariants } from '@ui/button.variants'
import { cx } from '@ui/variants'
import type { VariantProps } from 'class-variance-authority'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      data-slot="button"
      data-variant={variant ?? 'default'}
      data-size={size ?? 'default'}
      className={cx(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
})
