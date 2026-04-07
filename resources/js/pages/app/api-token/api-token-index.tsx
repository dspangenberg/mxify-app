import { Add01Icon, Copy01Icon } from '@hugeicons/core-free-icons'
import { router, usePage } from '@inertiajs/react'
import { AppPage } from '@/components/app-page'
import { DataTable } from '@/components/data-table'
import { Alert } from '@/components/twc-ui/alert'
import { Button } from '@/components/twc-ui/button'
import { Toolbar } from '@/components/twc-ui/toolbar'
import { appRoute } from '@/lib/utils'
import { columns } from './api-token-columns'
export default function ApiTokenEdit({
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
    <AppPage
      title="API tokens"
      description="Manage your API access tokens"
      toolbar={
        <Toolbar>
          <Button
            variant="toolbar-default"
            icon={Add01Icon}
            title="Create new token"
            onClick={() => router.visit(appRoute('app.api-tokens.create'))}
          />
        </Toolbar>
      }
    >
      <DataTable
        columns={columns}
        data={tokens.data}
        filterBar={
          <div className="px-0 pr-2.5">
            {flash.api_token && (
              <Alert
                className="mb-4"
                title="Copy the api token; it will only be shown once."
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
                  <p className="text-sm">{flash.api_token}</p>
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
        itemName="API-tokens"
      />
    </AppPage>
  )
}

ApiTokenEdit.layout = {
  breadcrumbs: [
    {
      title: 'API tokens',
      href: appRoute('app.api-tokens.index')
    }
  ]
}
