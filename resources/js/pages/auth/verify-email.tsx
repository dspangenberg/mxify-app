// Components
import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'
import type { FormEventHandler } from 'react'
import { Alert } from '@/components/twc-ui/alert'

import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({})

  const submit: FormEventHandler = e => {
    e.preventDefault()

    post(route('verification.send'))
  }

  return (
    <>
      <Head title="Email verification" />

      {status === 'verification-link-sent' && (
        <Alert variant="success" title="Let's move on">
          A new verification link has been sent to your email
          address.
        </Alert>
      )}

      <form onSubmit={submit} className="space-y-6 text-center">
        <Button disabled={processing} variant="secondary">
          {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Resend verification email
        </Button>

        <TextLink href={route('logout')} method="post" className="mx-auto block text-sm">
          Log out
        </TextLink>
      </form>
    </>
  )
}

VerifyEmail.layout = {
  title: 'Verify email',
  description:
    'Please verify your email address by clicking on the link we just emailed to you.',
};
