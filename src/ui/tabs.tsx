import { Tabs } from '@base-ui/react/tabs'
import { cx } from '@ui/variants'

export const TabsRoot = Tabs.Root
export const TabsList = Tabs.List
export const TabsPanel = Tabs.Panel

export function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Tabs.Tab>) {
  const extra = typeof className === 'string' ? className : undefined
  return (
    <Tabs.Tab
      {...props}
      className={cx(
        'rounded-md px-3 py-1.5 text-sm font-medium text-zinc-600 data-[selected]:bg-white data-[selected]:text-zinc-900 data-[selected]:shadow-sm',
        extra,
      )}
    />
  )
}
