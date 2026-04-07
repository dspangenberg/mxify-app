import { AppPage } from '@/components/app-page'
import { AvatarUpload } from '@/components/twc-ui/avatar-upload'
import { Button } from '@/components/twc-ui/button'
import { Form, useForm } from '@/components/twc-ui/form'
import { FormCard } from '@/components/twc-ui/form-card'
import { FormGrid } from '@/components/twc-ui/form-grid'
import { FormTextField } from '@/components/twc-ui/form-text-field'
import { useInitials } from '@/hooks/use-initials'

type AppFormData = App.Data.AppData & {
  avatar: File | null
  remove_avatar: boolean
}

export default function AppEdit({ application }: { application: App.Data.AppData }) {
  const form = useForm<AppFormData>(
    'app-edit-form',
    application.id ? 'put' : 'post',
    application.id
      ? route('admin.apps.update', { app: application.id })
      : route('admin.apps.store'),
    {
      ...application,
      avatar: null,
      remove_avatar: false
    }
  )

  const getInitials = useInitials()

  const handleAvatarChange = (avatar: File | undefined) => {
    if (avatar) {
      form.setData('avatar', avatar)
    } else {
      form.setData('remove_avatar', true)
    }
  }

  const title = application.id ? 'Edit Application' : 'Create Application'

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
          <FormGrid>
            <div className="col-span-2 inline-flex items-center justify-center">
              <div>
                <AvatarUpload
                  src={application.avatar_url}
                  fullname={application.name}
                  initials={getInitials(application.name)}
                  size="lg"
                  onSelect={item => handleAvatarChange(item)}
                />
              </div>
            </div>
            <div className="col-span-10">
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
          </FormGrid>
          <FormGrid border>
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
