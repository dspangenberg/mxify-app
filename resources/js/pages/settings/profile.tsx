import { Transition } from '@headlessui/react'
import { router, usePage } from '@inertiajs/react'
import { Alert } from '@/components/twc-ui/alert'
import { AvatarUpload } from '@/components/twc-ui/avatar-upload'
import { Button } from '@/components/twc-ui/button'
import { Form, useForm } from '@/components/twc-ui/form'
import { FormCard } from '@/components/twc-ui/form-card'
import { FormGrid } from '@/components/twc-ui/form-grid'
import { FormTextField } from '@/components/twc-ui/form-text-field'
import { useInitials } from '@/hooks/use-initials'
import { appDashboardRoute, appRoute } from '@/lib/utils'
import type { SharedData } from '@/types'

type ProfileForm = {
  name: string
  email: string
  avatar: File | null
  remove_avatar: boolean
}

export default function Profile() {
  const { auth } = usePage<SharedData>().props
  const getInitials = useInitials()

  const form = useForm<ProfileForm>(
    'auth-login-form',
    'patch',
    route('app.profile.update'),
    {
      email: auth.user.email,
      name: auth.user.name,
      avatar: null,
      remove_avatar: false
    },
    { validateOn: 'blur' }
  )

  const handleAvatarChange = (avatar: File | undefined) => {
    if (avatar) {
      form.setData('avatar', avatar)
    } else {
      form.setData('remove_avatar', true)
    }
  }

  const handleResendVerificationEmail = () => {
    router.post(route('app.profile.resend-verification-email'))
  }

  const handleClearPendingMailAddress = async () => {
    router.post(route('app.profile.clear-pending-mail-address'))
  }

  return (
    <FormCard
      className="mx-auto flex w-full max-w-4xl flex-1"
      footerClassName="flex justify-between gap-2"
      footer={
        <>
          <div className="flex-1">
            <Transition
              show={form.recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-success">Profile updated successfully.</p>
            </Transition>
          </div>
          <Button
            form={form.id}
            type="submit"
            variant="default"
            title="Update Profile"
            isLoading={form.processing}
          />
        </>
      }
    >
      {auth.user.pending_email && (
        <Alert
          variant="warning"
          actions={
            <div className="flex items-center gap-2">
              <Button
                variant="link"
                title="Resend Email"
                className="text-yellow-700"
                onClick={handleResendVerificationEmail}
              />
              <Button
                variant="link"
                size="auto"
                title="Undo"
                tooltip="Undo"
                className="text-yellow-700"
                onClick={handleClearPendingMailAddress}
              />
            </div>
          }
        >
          Your updated email address, {auth.user.pending_email} has not yet been confirmed.
        </Alert>
      )}
      <Form form={form}>
        <FormGrid>
          <div className="col-span-2 inline-flex items-center justify-center">
            <div>
              <AvatarUpload
                src={auth.user.avatar_url}
                fullname={auth.user.name}
                initials={getInitials(auth.user.name)}
                size="lg"
                onSelect={item => handleAvatarChange(item)}
              />
            </div>
          </div>
          <div className="col-span-11">
            <FormTextField
              autoFocus
              label="Name"
              isRequired
              placeholder="Full name"
              {...form.register('name')}
            />
          </div>
          <div className="col-span-11">
            <FormTextField
              isRequired
              label="Email address"
              placeholder="Full name"
              {...form.register('email')}
            />
          </div>
        </FormGrid>
      </Form>
    </FormCard>
  )
}

Profile.layout = {
  breadcrumbs: [
    {
      title: 'Dashboard',
      href: appDashboardRoute()
    },
    {
      title: 'Account settings',
      href: appRoute('app.settings')
    },
    {
      title: 'Profile',
      href: appRoute('app.profile.edit')
    }
  ]
}
