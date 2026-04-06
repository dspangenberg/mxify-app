/*
 * opsc.core is licensed under the terms of the EUPL-1.2 license
 * Copyright (c) 2024-2025 by Danny Spangenberg (twiceware solutions e. K.)
 */

import { router, usePage } from '@inertiajs/react'
import { ChevronsUpDown } from 'lucide-react'
import { Pressable } from 'react-aria-components'
import { Avatar } from '@/components/twc-ui/avatar'
import { DropdownButton } from '@/components/twc-ui/dropdown-button'
import { BaseMenuItem, MenuHeader, MenuItem, MenuSeparator } from '@/components/twc-ui/menu'
import { useInitials } from '@/hooks/use-initials'
import type { SharedData } from '@/types'
export function AppSelector() {
  const apps = usePage<SharedData>().props.apps
  const appId = usePage<SharedData>().props.currentAppId
  const currentApp = apps.find(app => app.id === parseInt(appId as unknown as string, 10))
  const getInitials = useInitials()

  return (
    <DropdownButton
      menuClassName="w-64"
      triggerElement={
        <Pressable>
          <button type="button" className="flex w-64 items-center gap-2.5">
            <Avatar
              src={currentApp?.avatar_url as string}
              initials={getInitials(currentApp?.name as string)}
              fullname={currentApp?.name}
              alt="Profile picture"
              className="flex-none"
            />
            <div className="flex-1 truncate text-left font-bold text-base">{currentApp?.name}</div>
            {apps.length > 1 && (
              <ChevronsUpDown className="ml-auto size-4 flex-none text-foreground/50" />
            )}
          </button>
        </Pressable>
      }
    >
      {apps.map(app => (
        <MenuItem
          key={app.id}
          title={app.name}
          onClick={() => router.post(route('apps.select-action', { app: app.id }))}
        />
      ))}
    </DropdownButton>
  )
}
