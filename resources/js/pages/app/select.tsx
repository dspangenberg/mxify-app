import { Head, useForm } from '@inertiajs/react'
import HeadingSmall from '@/components/heading-small'
import { cn } from '@/lib/utils'
import type { AppData } from '@/types'

export default function AppSelect({ apps }: { apps: AppData[] }) {
  const { post, processing } = useForm()

  if (apps.length === 1) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 p-6 dark:bg-stone-900">
        <div className="text-center">
          <p className="mb-4 text-sm text-stone-600 dark:text-stone-400">
            Redirecting to your app...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 p-6 dark:bg-stone-900">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <HeadingSmall title="Select an App" description="Choose which app you want to manage" />
        </div>
        <div className="space-y-3">
          {apps.map(app => (
            <button
              key={app.id}
              disabled={processing}
              onClick={() => post(route('apps.select-action', { app: app.id }))}
              className={cn(
                'flex w-full items-center gap-4 rounded-lg border border-stone-200 bg-white p-4 shadow-sm',
                'transition-colors hover:border-stone-300 hover:bg-stone-50',
                'dark:border-stone-700 dark:bg-stone-800 dark:hover:border-stone-600 dark:hover:bg-stone-700',
                processing && 'cursor-not-allowed opacity-50'
              )}
            >
              {app.avatar_url ? (
                <img
                  src={app.avatar_url}
                  alt={app.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-stone-100 font-medium text-lg text-stone-600 dark:bg-stone-700 dark:text-stone-300">
                  {app.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1 text-left">
                <h3 className="font-medium text-stone-900 dark:text-stone-100">{app.name}</h3>
                {app.description && (
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    {app.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
        {apps.length === 0 && (
          <p className="text-center text-stone-500 dark:text-stone-400">
            No apps available. Contact your administrator.
          </p>
        )}
      </div>
      <Head title="Select App" />
    </div>
  )
}
