/*
 * opsc.core is licensed under the terms of the EUPL-1.2 license
 * Copyright (c) 2024-2025 by Danny Spangenberg (twiceware solutions e. K.)
 */

import {
  DashboardCircleIcon,
  Logout02Icon,
  Setting07Icon,
  UserGroupIcon,
  UserSettings01Icon
} from '@hugeicons/core-free-icons'
import { router } from '@inertiajs/react'
import { Pressable } from 'react-aria-components'
import { Avatar } from '@/components/twc-ui/avatar'
import { DropdownButton } from '@/components/twc-ui/dropdown-button'
import { Menu, MenuHeader, MenuItem, MenuPopover, MenuSubTrigger } from '@/components/twc-ui/menu'
import { useInitials } from '@/hooks/use-initials'
export function NavUser({ user }: { user: App.Data.UserData }) {
  const getInitials = useInitials()

  const handleLogout = () => {
    router.post(route('logout', {}, false))
  }

  return (
    <DropdownButton
      menuClassName="min-w-64"
      triggerElement={
        <Pressable>
          <button type="button">
            <Avatar
              src={user.avatar_url as string}
              initials={getInitials(user.name)}
              alt="Profile picture"
              fullname={user.name}
            />
          </button>
        </Pressable>
      }
    >
      <MenuHeader>
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar
            src={user.avatar_url as string}
            initials={getInitials(user.name)}
            alt="Profile picture"
            fullname={user.name}
          />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-bold">{user.name}</span>
            <span className="truncate pt-0.5 font-normal text-xs">{user.email}</span>
          </div>
        </div>
      </MenuHeader>

      <MenuItem
        icon={UserSettings01Icon}
        title="Account settings"
        ellipsis
        separator
        href={route('app.settings')}
      />

      {user.is_admin && (
        <MenuSubTrigger>
          <MenuItem icon={Setting07Icon} separator title="Administration" />
          <MenuPopover>
            <Menu>
              <MenuItem
                icon={UserGroupIcon}
                ellipsis
                href={route('admin.users.index')}
                title="Users"
              />
              <MenuItem
                icon={DashboardCircleIcon}
                ellipsis
                href={route('admin.apps.index')}
                title="Applications"
              />
            </Menu>
          </MenuPopover>
        </MenuSubTrigger>
      )}

      <MenuItem icon={Logout02Icon} title="Logout" onAction={() => handleLogout()} />
    </DropdownButton>
  )
}
