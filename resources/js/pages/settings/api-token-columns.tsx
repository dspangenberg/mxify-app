/*
 * opsc.core is licensed under the terms of the EUPL-1.2 license
 * Copyright (c) 2024-2025 by Danny Spangenberg (twiceware solutions e. K.)
 */

import { Delete03Icon, MoreVerticalCircle01Icon } from '@hugeicons/core-free-icons'
import { router } from '@inertiajs/core'
import type { ColumnDef, Row } from '@tanstack/react-table'
import { AlertDialog } from '@/components/twc-ui/alert-dialog'
import { DropdownButton } from '@/components/twc-ui/dropdown-button'
import { MenuItem } from '@/components/twc-ui/menu'
import { Checkbox } from '@/components/ui/checkbox'

const handleDeleteProject = async (row: App.Data.ApiTokenData) => {
  if (row.id == null) return
  const promise = await AlertDialog.call({
    title: 'Projekt in den Papierkorb legen',
    message: `Möchtest Du das Projekt ${row.name} in den Papierkorb legen?`,
    buttonTitle: 'Projekt löschen'
  })
  if (promise) {
    router.delete(route('app.project.delete', { project: row.id }))
  }
}

const RowActions = ({ row }: { row: Row<App.Data.ApiTokenData> }) => {
  return (
    <div className="mx-auto">
      <DropdownButton variant="ghost" size="icon-sm" icon={MoreVerticalCircle01Icon}>
        <MenuItem
          icon={Delete03Icon}
          title="Löschen"
          variant="destructive"
          onAction={() => handleDeleteProject(row.original)}
        />
      </DropdownButton>
    </div>
  )
}

export const columns: ColumnDef<App.Data.ApiTokenData>[] = [
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
    header: 'Name and abilities',
    size: 300,
    cell: ({ row }) => (
      <div>
        {row.original.name}
        <div className="text-xs text-muted-foreground">
          {row.original.abilities.join(', ')}
        </div>
      </div>
    )
  },
  {
    accessorKey: 'expires_at',
    header: 'Expires at',
    size: 80,
    cell: ({ row }) => <span>{row.original.expires_at}</span>
  },
  {
    id: 'actions',
    size: 30,
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
    enableHiding: false
  }
]
