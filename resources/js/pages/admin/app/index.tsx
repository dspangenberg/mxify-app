import { Add01Icon } from '@hugeicons/core-free-icons'
import { router, usePage } from '@inertiajs/react'
import { AppPage } from '@/components/app-page'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/twc-ui/button'
import { Toolbar } from '@/components/twc-ui/toolbar'
import { appRoute } from '@/lib/utils'
import { columns } from './index-columns'
export default function ZoneIndex({
  applications
}: {
  applications: App.Data.Paginated.PaginationMeta<App.Data.AppData[]>
}) {
  return (
    <AppPage
      title="Applications"
      toolbar={
        <Toolbar>
          <Button
            variant="toolbar-default"
            icon={Add01Icon}
            title="Create new app"
            onClick={() => router.visit(route('admin.apps.create'))}
          />
        </Toolbar>
      }
    >
      <DataTable
        columns={columns}
        data={applications.data}
        pagination={{
          current_page: applications.current_page,
          last_page: applications.last_page,
          per_page: applications.per_page,
          total: applications.total
        }}
        onPageChange={page => router.get(route('admin.apps.index', { page }))}
        itemName="Applications"
      />
    </AppPage>
  )
}

ZoneIndex.layout = {
  breadcrumbs: [
    {
      title: 'Applications',
      appRoute: 'admin.apps.index'
    }
  ]
}
