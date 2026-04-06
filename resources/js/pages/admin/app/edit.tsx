import { AppPage } from '@/components/app-page'
import { Button } from '@/components/twc-ui/button'
import { Form, useForm } from '@/components/twc-ui/form'
import { FormCard } from '@/components/twc-ui/form-card'
import { FormGrid } from '@/components/twc-ui/form-grid'
import { FormTextField } from '@/components/twc-ui/form-text-field'
import { appDashboardRoute } from '@/lib/utils'

export default function AppEdit({ application }: { application: App.Data.AppData }) {
  const form = useForm<App.Data.AppData>(
    'app-edit-form',
    application.id ? 'put' : 'post',
    application.id
      ? route('admin.apps.update', { app: application.id })
      : route('admin.apps.store'),
    application
  )

  const title = app.id ? 'Edit Application' : 'Create Application'

  return (
    <AppPage title={title}>
      <FormCard
        className="mx-auto flex w-full max-w-4xl flex-1"
        footer={
          <>
            <div className="flex-1" />
            <Button
              form={form.id}
              type="submit"
              variant="default"
              title="Save"
              isLoading={form.processing}
            />
          </>
        }
      >
        <Form form={form}>
          <FormGrid className="w-full">
            <div className="col-span-12">
              <FormTextField
                autoFocus
                label="Name"
                isRequired
                placeholder="Example App"
                {...form.register('name')}
              />
            </div>
            <div className="col-span-12">
              <FormTextField
                label="Website"
                isRequired
                placeholder="https://example.com"
                {...form.register('website')}
              />
            </div>
            <div className="col-span-12">
              <FormTextField
                label="MX record name"
                isRequired
                placeholder="mx.example.com"
                {...form.register('mx_name')}
              />
            </div>
            <div className="col-span-5">
              <FormTextField
                label="IP4 address"
                isRequired
                placeholder="192.168.1.1"
                {...form.register('mx_ip4')}
              />
            </div>
            <div className="col-span-7">
              <FormTextField
                label="IP6 address"
                placeholder="2001:db8:0:8d3::8a2e:70:7344"
                {...form.register('mx_ip6')}
              />
            </div>
            <div className="col-span-12">
              <FormTextField
                label="Email address prefix"
                placeholder="dropbox"
                description="This will be used to prefix email addresses for receipients (e.g. dropbox-3DlmNB@tenant.example.com)."
                {...form.register('address_prefix')}
              />
            </div>
            <div className="col-span-12">
              <FormTextField
                label="Webhook route"
                placeholder="postman"
                description="This route will be a added to zone webhook URLs (e.g. https://example.com/webhook/postman)."
                {...form.register('webhook_route')}
              />
            </div>
          </FormGrid>
        </Form>
      </FormCard>
    </AppPage>
  )
}

AppEdit.layout = page => {
  // page.props enthält alle Props der Seite

  return {
    breadcrumbs: [
      {
        title: 'Applications',
        href: route('admin.apps.index')
      },
      {
        title: page.application.id ? 'Edit' : 'Create',
        href: null
      }
    ]
  }
}
