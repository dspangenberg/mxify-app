import {
  BlockGameIcon,
  BlueskyIcon,
  BookOpen01Icon,
  GeometricShapes01Icon,
  Github01Icon,
  Home13Icon,
  DashboardSquare03Icon,
  MailAccount02Icon,
  ServerStack01Icon,
  Settings02Icon
} from '@hugeicons/core-free-icons'
import { Link, usePage } from '@inertiajs/react'
import { NavFooter } from '@/components/nav-footer'
import { NavMain } from '@/components/nav-main'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import type { NavItem, SharedData } from '@/types'
import AppLogo from './app-logo'
import { NavUser } from '@/components/nav-user'

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: route('app.dashboard', {}, false),
    icon: DashboardSquare03Icon
  },
  {
    title: 'Zones',
    href: route('app.placeholder', {}, false),
    icon: ServerStack01Icon
  },
  {
    title: 'Recipients',
    href: route('app.placeholder', {}, false),
    icon: MailAccount02Icon
  },
  {
    title: 'Setup',
    href: route('app.placeholder', {}, false),
    icon: Settings02Icon
  }
]


const footerNavItems: NavItem[] = [
  {
    title: 'Github',
    href: 'https://github.com/twiceware-cloud/ui',
    icon: Github01Icon
  },
  {
    title: 'Bluesky',
    href: 'https://bsky.app/profile/ui.twiceware.cloud',
    icon: BlueskyIcon
  }
]

export function AppSidebar() {
  const page = usePage<SharedData>()
  const user = page.props.auth.user

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

    </Sidebar>
  )
}
