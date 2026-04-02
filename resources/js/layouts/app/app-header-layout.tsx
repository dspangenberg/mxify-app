import type { PropsWithChildren } from 'react'
import { AppContent } from '@/components/app-content'
import { AppHeader } from '@/components/app-header'
import { AppShell } from '@/components/app-shell'
import type { BreadcrumbItem } from '@/types'

export default function AppHeaderLayout({
  children,
  breadcrumbs
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
  return (
    <AppShell>
      <AppHeader breadcrumbs={breadcrumbs} />
      <AppContent className="mx-auto w-full max-w-6xl flex-1 overflow-scroll">
        {children}
      </AppContent>
    </AppShell>
  )
}
