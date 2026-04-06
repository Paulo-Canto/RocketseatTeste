import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/items')({
  component: ItemsLayout,
})

function ItemsLayout() {
  return (
    <div className="space-y-4">
      <Outlet />
    </div>
  )
}
