import { Tooltip } from '@base-ui/react/tooltip'
import { cx } from '@ui/variants'

export const TooltipProvider = Tooltip.Provider
export const TooltipRoot = Tooltip.Root
export const TooltipTrigger = Tooltip.Trigger

export function TooltipContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <Tooltip.Portal>
      <Tooltip.Positioner sideOffset={6}>
        <Tooltip.Popup className={cx('z-50 rounded-md bg-zinc-900 px-2 py-1 text-xs text-white shadow', className)}>{children}</Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  )
}
