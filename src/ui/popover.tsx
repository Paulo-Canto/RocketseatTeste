import { Popover } from '@base-ui/react/popover'
import { cx } from '@ui/variants'

export const PopoverRoot = Popover.Root
export const PopoverTrigger = Popover.Trigger

export function PopoverContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <Popover.Portal>
      <Popover.Positioner sideOffset={8}>
        <Popover.Popup className={cx('z-50 rounded-md border border-zinc-200 bg-white p-3 text-sm shadow-md outline-none', className)}>
          {children}
        </Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  )
}
