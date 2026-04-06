import { flexRender, getCoreRowModel, useReactTable, type ColumnDef, type Row } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'
import { Table, TableHead, TableHeader, TableRow } from '@ui/table'

export type DataGridTableProps<TData> = {
  data: TData[]
  columns: ColumnDef<TData, unknown>[]
  getRowId: (row: TData) => string
}

export function DataGridTable<TData>({ data, columns, getRowId }: DataGridTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => getRowId(row),
  })
  const parentRef = useRef<HTMLDivElement>(null)
  const rows = table.getRowModel().rows
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 8,
  })
  const virtualRows = virtualizer.getVirtualItems()

  return (
    <div ref={parentRef} className="max-h-[min(60vh,480px)] overflow-auto rounded-md border border-zinc-200">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
      </Table>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualRows.map((virtualRow) => {
          const row = rows[virtualRow.index] as Row<TData>
          return (
            <div
              key={row.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="flex border-b border-zinc-100"
            >
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id} className="flex-1 p-2 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
