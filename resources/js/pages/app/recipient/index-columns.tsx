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
import { Checkbox } from '@/components/ui/checkbox'
import { appRoute } from '@/lib/utils'

const handleDelete = async (row: App.Data.RecipientData) => {
  if (row.id == null) return
  const promise = await AlertDialog.call({
    title: 'Delete zone',
    message: `Do you want to delete ${row.email_address}?`,
    buttonTitle: 'Delete'
  })
  if (promise) {
    router.delete(appRoute('app.zones.delete', { zone: row.id }))
  }
}

const RowActions = ({ row }: { row: Row<App.Data.RecipientData> }) => {
  return (
    <div className="mx-auto">
      <DropdownButton variant="ghost" size="icon-sm" icon={MoreVerticalCircle01Icon}>
        <MenuItem
          icon={Edit04Icon}
          title="Edit"
          ellipsis
          separator
          href={appRoute('app.zones.edit', { zone: row.original.id })}
        />
        <MenuItem
          icon={Delete03Icon}
          title="Delete"
          variant="destructive"
          onAction={() => handleDelete(row.original)}
        />
      </DropdownButton>
    </div>
  )
}

export const columns: ColumnDef<App.Data.RecipientData>[] = [
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
    accessorKey: 'email_address',
    header: 'Email address',
    size: 200,
    cell: ({ row }) => <div>{row.original.email_address}</div>
  },
  {
    accessorKey: 'description',
    header: 'Description',
    size: 100,
    cell: ({ row }) => <div>{row.original.description}</div>
  },
  {
    accessorKey: 'zone_id',
    header: 'Zone',
    size: 150,
    cell: ({ row }) => <div className="truncate">{row.original.zone.name}</div>
  },
  {
    id: 'actions',
    size: 30,
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
    enableHiding: false
  }
]
