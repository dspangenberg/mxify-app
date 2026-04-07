/*
 * opsc.core is licensed under the terms of the EUPL-1.2 license
 * Copyright (c) 2024-2025 by Danny Spangenberg (twiceware solutions e. K.)
 */

import { Delete03Icon, Edit04Icon, MoreVerticalCircle01Icon } from '@hugeicons/core-free-icons'
import { router } from '@inertiajs/react'
import type { ColumnDef, Row } from '@tanstack/react-table'
import { AlertDialog } from '@/components/twc-ui/alert-dialog'
import { DropdownButton } from '@/components/twc-ui/dropdown-button'
import { MenuItem } from '@/components/twc-ui/menu'
import { StatusIcon } from '@/components/twc-ui/status-icon'
import { Checkbox } from '@/components/ui/checkbox'
import { appRoute } from '@/lib/utils'

const RowActions = ({ row }: { row: Row<App.Data.AppData> }) => {
  return (
    <div className="mx-auto">
      <DropdownButton variant="ghost" size="icon-sm" icon={MoreVerticalCircle01Icon}>
        <MenuItem
          icon={Edit04Icon}
          title="Edit"
          ellipsis
          separator
          href={route('admin.apps.edit', { app: row.original.id })}
        />
      </DropdownButton>
    </div>
  )
}

export const columns: ColumnDef<App.Data.AppData>[] = [
  {
    id: 'select',
    size: 20,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        className="mx-3 bg-background align-middle"
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          className="mx-3 bg-background align-middle"
          aria-label="Select row"
        />
      </div>
    )
  },
  {
    accessorKey: 'name',
    header: 'Name',
    size: 150,
    cell: ({ row }) => <div>{row.original.name}</div>
  },
  {
    id: 'actions',
    size: 30,
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
    enableHiding: false
  }
]
