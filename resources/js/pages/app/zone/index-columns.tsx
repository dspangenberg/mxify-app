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

const handleDelete = async (row: App.Data.ZoneData) => {
  if (row.id == null) return
  const promise = await AlertDialog.call({
    title: 'Delete zone',
    message: `Do you want to delete ${row.name}?`,
    buttonTitle: 'Delete'
  })
  if (promise) {
    router.delete(appRoute('app.zones.delete', { zone: row.id }))
  }
}

const handleDnsCheck = (row: App.Data.ZoneData) => {
  if (row.id == null) return
  router.put(appRoute('app.zones.check-dns', { zone: row.id }))
}

const RowActions = ({ row }: { row: Row<App.Data.ZoneData> }) => {
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
        <MenuItem title="Check DNS record again" onClick={() => handleDnsCheck(row.original)} />
        <MenuItem title="Create record with Hetzner API" separator />
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

export const columns: ColumnDef<App.Data.ZoneData>[] = [
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
    accessorKey: 'is_dns_created',
    header: '',
    size: 10,
    cell: ({ row }) => {
      return row.original.is_dns_created ? (
        <StatusIcon variant="success" tooltip="DNS record found" />
      ) : (
        <StatusIcon variant="warning" tooltip="DNS record not found" />
      )
    }
  },
  {
    accessorKey: 'name',
    header: 'Name',
    size: 150,
    cell: ({ row }) => <div>{row.original.name}</div>
  },
  {
    accessorKey: 'webhook_url',
    header: 'Webhook url',
    size: 150,
    cell: ({ row }) => <div className="truncate">{row.original.webhook_url}</div>
  },
  {
    accessorKey: 'dns_checked_at',
    header: 'DNS checked',
    size: 80,
    cell: ({ row }) => <span>{row.original.created_at}</span>
  },
  {
    id: 'actions',
    size: 30,
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
    enableHiding: false
  }
]
