import { createFileRoute } from '@tanstack/react-router'
import { itemDetailQueryOptions } from '@core/queries'
import { ItemDetail } from '@features/items/detail'

export const Route = createFileRoute('/_main/items/$itemId')({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(itemDetailQueryOptions(params.itemId)),
  component: ItemDetailRoute,
})

function ItemDetailRoute() {
  const { itemId } = Route.useParams()
  return <ItemDetail itemId={itemId} />
}
