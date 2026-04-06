import { Checkbox as CheckboxParts } from '@base-ui/react/checkbox'
import { cx } from '@ui/variants'

export type CheckboxProps = {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  id?: string
  name?: string
}

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <CheckboxParts.Root
      data-slot="checkbox"
      className={cx(
        'flex size-4 items-center justify-center rounded border border-zinc-400 data-[checked]:border-zinc-900 data-[checked]:bg-zinc-900',
        className,
      )}
      {...props}
    >
      <CheckboxParts.Indicator className="text-[10px] text-white">✓</CheckboxParts.Indicator>
    </CheckboxParts.Root>
  )
}
