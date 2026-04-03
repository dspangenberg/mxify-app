import { Head } from '@inertiajs/react'
import type * as React from 'react'
import HeadingSmall from '@/components/heading-small'

interface AppContentProps extends React.ComponentProps<'header'> {
  tabs?: React.ReactNode
  toolbar?: React.ReactNode
  title: string
  description?: string
  children: React.ReactNode
}

export function AppPage({ children, tabs, ...props }: AppContentProps) {
  return (
    <div className="w-full bg-background">
      <header className="flex h-full w-full flex-1 flex-col gap-4 border-sidebar-border/80 border-b bg-background">
        <div className="mx-auto mt-6 w-full max-w-6xl px-4">
          <Head title={props.title} />
          <HeadingSmall title={props.title} description={props.description} />
          {tabs && <div className="mt-4">{tabs}</div>}
        </div>
      </header>
      <main className='flex h-full w-full flex-1 flex-col gap-4 bg-stone-50 py-6 dark:bg-stone-900'>
        {children}
      </main>
    </div>
  )
}
