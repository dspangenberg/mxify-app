/*
 * opsc.core is licensed under the terms of the EUPL-1.2 license
 * Copyright (c) 2024-2025 by Danny Spangenberg (twiceware solutions e. K.)
 */

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type Table as TanstackTable,
  useReactTable
} from '@tanstack/react-table'
import type React from 'react'
import { useEffect, useImperativeHandle, useRef } from 'react'
import { ScrollArea } from '@/components/twc-ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

interface DataTableProps<TData, TValue> {
  ref?: React.Ref<DataTableRef>
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination?: PaginationMeta
  footer?: React.ReactNode
  header?: React.ReactNode
  itemName?: string
  actionBar?: React.ReactNode
  filterBar?: React.ReactNode
  onSelectedRowsChange?: (selectedRows: TData[]) => void
  onPageChange?: (page: number) => void
}

export interface DataTableRef {
  resetRowSelection: () => void
}

export function DataTable<TData, TValue>({
  ref,
  actionBar,
  columns,
  data,
  filterBar,
  footer,
  header,
  onSelectedRowsChange,
  onPageChange,
  itemName = 'Datensätze',
  pagination
}: DataTableProps<TData, TValue>) {
  const tableRef = useRef<TanstackTable<TData> | null>(null)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  tableRef.current = table

  useImperativeHandle(ref, () => ({
    resetRowSelection: () => tableRef.current?.resetRowSelection()
  }))

  useEffect(() => {
    if (onSelectedRowsChange) {
      const selectedRowsData = table.getSelectedRowModel().rows.map(row => row.original)
      onSelectedRowsChange(selectedRowsData)
    }
  }, [table, onSelectedRowsChange])

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <div className="mx-2 flex-none">{header}</div>

      <div className="relative flex max-h-fit w-full flex-1 flex-col gap-1.5 overflow-hidden rounded-lg border border-border/80 bg-page-content p-1.5 pt-2">
        {filterBar}
        <ScrollArea className="min-h-0 flex-1 rounded-md border bg-page-content" scroll-region="">
          <Table className="table-fixed border-spacing-0 border-b-0 bg-background [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-border [&_th]:border-b [&_tr:not(:last-child)_td]:border-b [&_tr]:border-none">
            <TableHeader className="rounded-t-md bg-sidebar">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="rounded-md border hover:bg-sidebar">
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      className="text-foreground"
                      style={{ width: `${header.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="mt-12 mb-12">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="truncate text-foreground">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No {itemName} found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
        {table.getSelectedRowModel().rows.length > 0 ? actionBar : null}
      </div>
      {pagination && (
        <div className="flex items-center justify-between gap-2 px-2 py-2">
          <p className="text-muted-foreground text-sm">
            Showing {(pagination.current_page - 1) * pagination.per_page + 1} to{' '}
            {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of{' '}
            {pagination.total} entries
          </p>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => onPageChange?.(pagination.current_page - 1)}
              disabled={pagination.current_page <= 1}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => onPageChange?.(pagination.current_page + 1)}
              disabled={pagination.current_page >= pagination.last_page}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {footer && <div className="mx-2 flex-none">{footer}</div>}
    </div>
  )
}
