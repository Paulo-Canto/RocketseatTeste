import { cx } from '@ui/variants'

export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="relative w-full overflow-auto">
      <table data-slot="table" className={cx('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  )
}

export function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cx('[&_tr]:border-b', className)} {...props} />
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cx('[&_tr:last-child]:border-0', className)} {...props} />
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cx('border-b border-zinc-200 transition-colors hover:bg-zinc-50/50', className)} {...props} />
}

export function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cx('h-10 px-2 text-left align-middle font-medium text-zinc-600 [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cx('p-2 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props} />
}
