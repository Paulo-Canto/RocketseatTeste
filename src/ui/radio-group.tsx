import { Radio } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupBase } from '@base-ui/react/radio-group'
import { cx } from '@ui/variants'

export type RadioGroupProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string, eventDetails: unknown) => void
  className?: string
  children: React.ReactNode
  name?: string
}

export function RadioGroup({ className, children, ...props }: RadioGroupProps) {
  return (
    <RadioGroupBase data-slot="radio-group" className={cx('grid gap-2', className)} {...props}>
      {children}
    </RadioGroupBase>
  )
}

export type RadioItemProps = {
  value: string
  className?: string
  children: React.ReactNode
  disabled?: boolean
}

export function RadioItem({ className, value, children, disabled }: RadioItemProps) {
  return (
    <label className={cx('flex items-center gap-2 text-sm', className)}>
      <Radio.Root
        value={value}
        disabled={disabled}
        className="flex size-4 items-center justify-center rounded-full border border-zinc-400 data-[checked]:border-zinc-900"
      >
        <Radio.Indicator className="size-2 rounded-full bg-zinc-900" />
      </Radio.Root>
      {children}
    </label>
  )
}
