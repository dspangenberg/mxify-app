import { router } from '@inertiajs/react'
import { type PropsWithChildren, useEffect } from 'react'
import { AppContent } from '@/components/app-content'
import { AppHeader } from '@/components/app-header'
import { AppShell } from '@/components/app-shell'
import { Toaster, toast } from '@/components/twc-ui/sonner'
import type { BreadcrumbItem } from '@/types'

interface FlashToast {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info' | 'default'
}

interface FlashData {
  toast?: FlashToast
}

export default function AppHeaderLayout({
  children,
  breadcrumbs
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
  useEffect(() => {
    const unsubscribe = router.on('flash', event => {
      const flash = event.detail.flash as FlashData
      if (flash.toast) {
        const toastData = flash.toast
        toast(toastData.message, toastData.type)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AppShell>
      <AppHeader breadcrumbs={breadcrumbs} />
      <AppContent className="w-full flex-1 overflow-scroll bg-stone-50 dark:bg-stone-900">
        {children}
      </AppContent>
      <Toaster position="top-right" />
    </AppShell>
  )
}
