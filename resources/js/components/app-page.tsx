import { Head } from '@inertiajs/react'
import type * as React from 'react'
import HeadingSmall from '@/components/heading-small'
import { cn } from '@/lib/utils'

interface AppContentProps extends React.ComponentProps<'header'> {
  tabs?: React.ReactNode
  toolbar?: React.ReactNode
  title: string
  description?: string
  children: React.ReactNode
}

export function AppPage ({
  children,
  tabs,
  toolbar,
  ...props
}: AppContentProps) {
  return (
    <div className="w-full bg-background">
      <div className="border-sidebar-border/80 border-b">
        <header className="mx-auto flex h-full w-full max-w-6xl flex-1 gap-4 bg-background">
          <div className={cn('mt-6 mb-0 flex w-full max-w-6xl flex-1 flex-col px-4',  !tabs && 'mb-3.5')}>
            <Head title={props.title} />
            <HeadingSmall title={props.title} description={props.description} />
            {tabs && <div className="mt-4">{tabs}</div>}
          </div>
          <div className="flex flex-none items-center">{toolbar}</div>
        </header>
      </div>
      <main className="flex h-full w-full flex-1 flex-col gap-4 bg-stone-50 py-6 dark:bg-stone-900">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4">
          {children}
        </div>
      </main>
    </div>
  )
}
