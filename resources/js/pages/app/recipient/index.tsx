import { Add01Icon } from '@hugeicons/core-free-icons'
import { router, usePage } from '@inertiajs/react'
import { AppPage } from '@/components/app-page'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/twc-ui/button'
import { Toolbar } from '@/components/twc-ui/toolbar'
import { appRoute } from '@/lib/utils'
import type { SharedData } from '@/types'
import { columns } from './index-columns'
export default function RecipientIndex({
  recipients
}: {
  recipients: App.Data.Paginated.PaginationMeta<App.Data.RecipientData[]>
}) {
  return (
    <AppPage
      title="Recipients"
      toolbar={
        <Toolbar>
          <Button
            variant="toolbar-default"
            icon={Add01Icon}
            title="Create new recipient"
            onClick={() => router.visit(appRoute('app.recipients.create'))}
          />
        </Toolbar>
      }
    >
      <DataTable
        columns={columns}
        data={recipients.data}
        pagination={{
          current_page: recipients.current_page,
          last_page: recipients.last_page,
          per_page: recipients.per_page,
          total: recipients.total
        }}
        onPageChange={page => router.get(appRoute('app.recipients.index', { page }))}
        itemName="Zones"
      />
    </AppPage>
  )
}

RecipientIndex.layout = {
  breadcrumbs: [
    {
      title: 'Recipients',
      appRoute: 'app.recipients.index'
    }
  ]
}
