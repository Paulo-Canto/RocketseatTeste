import { forwardRef } from 'react'
import { inputVariants } from '@ui/input.variants'
import { cx } from '@ui/variants'
import type { VariantProps } from 'class-variance-authority'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof inputVariants>

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      data-slot="input"
      data-size={size ?? 'default'}
      className={cx(inputVariants({ size }), className)}
      {...props}
    />
  )
})
