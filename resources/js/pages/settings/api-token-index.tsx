import { Copy01Icon } from '@hugeicons/core-free-icons'
import { router, usePage } from '@inertiajs/react'
import { DataTable } from '@/components/data-table'
import { Alert } from '@/components/twc-ui/alert'
import { Button } from '@/components/twc-ui/button'
import { columns } from './api-token-columns'
export default function ApiTokenIndex({
  tokens
}: {
  tokens: App.Data.Paginated.PaginationMeta<App.Data.ApiTokenData[]>
}) {
  const { flash } = usePage<{ flash: { api_token?: string } }>().props

  const copyToClipboard = () => {
    if (flash.api_token) {
      navigator.clipboard.writeText(flash.api_token)
    }
  }

  return (
    <div className="mx-auto max-w-6xl">

      <DataTable
        columns={columns}
        data={tokens.data}
        filterBar={
        <div className="px-1 pr-2.5">
          {flash.api_token && (
              <Alert
                className="mb-4"
                title="Copy your personal access token; it will only be shown once."
                variant="info"
                actions={
                  <Button
                    variant="link"
                    size="icon-sm"
                    onClick={copyToClipboard}
                    className="rounded p-1 hover:bg-background"
                    icon={Copy01Icon}
                  />
                }
              >
                <div className="flex flex-col gap-2">
                  <p className="text-sm">
                    {flash.api_token}
                  </p>
                </div>
              </Alert>
            )}
        </div>
        }
        pagination={{
          current_page: tokens.current_page,
          last_page: tokens.last_page,
          per_page: tokens.per_page,
          total: tokens.total
        }}
        onPageChange={page => router.get(route('app.api-tokens.index', { page }))}
        itemName="API-token"
      />
    </div>
  )
}

ApiTokenIndex.layout = {
  breadcrumbs: [
    {
      title: 'Dashboard',
      href: route('app.dashboard')
    },
    {
      title: 'Account settings',
      href: route('app.settings')
    },
    {
      title: 'Personal access tokens',
      href: route('app.api-tokens.index')
    }
  ]
}
