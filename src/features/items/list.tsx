import { Link } from '@tanstack/react-router'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { DataGrid } from '@pattern/data-grid'
import { DataGridHeader } from '@pattern/data-grid-header'
import { DataGridTable } from '@pattern/data-grid-table'
import type { ItemRecord } from '@core/api/items'
import { useItemsList } from '@features/items/hooks'

const columnHelper = createColumnHelper<ItemRecord>()

const columns: ColumnDef<ItemRecord, unknown>[] = [
  columnHelper.accessor('title', { header: 'Title' }) as ColumnDef<ItemRecord, unknown>,
  columnHelper.accessor('updatedAt', { header: 'Updated' }) as ColumnDef<ItemRecord, unknown>,
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: (ctx) => (
      <Link to="/items/$itemId" params={{ itemId: ctx.row.original.id }} className="text-sm text-blue-600 underline">
        Open
      </Link>
    ),
  }) as ColumnDef<ItemRecord, unknown>,
]

export type ItemsListProps = {
  page: number
  q?: string
}

export function ItemsList({ page, q }: ItemsListProps) {
  const list = useItemsList({ page, q })

  if (list.isPending) {
    return <p className="text-sm text-zinc-600">Loading items…</p>
  }
  if (list.isError) {
    return <p className="text-sm text-red-600">Could not load items.</p>
  }

  return (
    <DataGrid>
      <DataGridHeader title="Items" />
      <DataGridTable data={list.data.items} columns={columns} getRowId={(row) => row.id} />
    </DataGrid>
  )
}
