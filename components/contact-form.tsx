'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, ContactFormData } from '@/lib/validations/contact'
import { FormField } from '@/components/form-field'
import { TextareaField } from '@/components/textarea-field'
import { SubmitButton } from '@/components/submit-button'
import { AlertCircle, Mail, Phone, AtSign, Hash, Send } from 'lucide-react'

export function ContactForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      phone: '',
      instagram: '',
      discord: '',
      telegram: '',
      message: '',
    },
  })

  async function onSubmit(data: ContactFormData) {
    setServerError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        setServerError(json.error ?? 'Something went wrong. Please try again.')
        return
      }

      router.push(`/thank-you?id=${json.id}`)
    } catch {
      setServerError('Network error. Please check your connection and try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      {serverError && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Required */}
      <FormField
        label="Email address"
        name="email"
        type="email"
        placeholder="you@example.com"
        icon={Mail}
        error={errors.email?.message}
        registration={register('email')}
      />

      {/* Divider */}
      <div className="my-1 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-[11px] font-medium uppercase tracking-wider text-gray-300">
          Social &amp; Contact
        </span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      <FormField
        label="Phone number"
        name="phone"
        type="tel"
        placeholder="+1 234 567 8900"
        optional
        icon={Phone}
        error={errors.phone?.message}
        registration={register('phone')}
      />

      <FormField
        label="Instagram"
        name="instagram"
        placeholder="@yourhandle"
        optional
        icon={AtSign}
        error={errors.instagram?.message}
        registration={register('instagram')}
      />

      <FormField
        label="Discord"
        name="discord"
        placeholder="username or user#1234"
        optional
        icon={Hash}
        error={errors.discord?.message}
        registration={register('discord')}
      />

      <FormField
        label="Telegram"
        name="telegram"
        placeholder="@yourusername"
        optional
        icon={Send}
        error={errors.telegram?.message}
        registration={register('telegram')}
      />

      {/* Divider */}
      <div className="my-1 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-[11px] font-medium uppercase tracking-wider text-gray-300">
          Anything else?
        </span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      <TextareaField
        label="Message"
        name="message"
        placeholder="Share anything you'd like us to know — questions, context, or anything else on your mind…"
        optional
        error={errors.message?.message}
        registration={register('message')}
      />

      <div className="mt-2">
        <SubmitButton isLoading={isSubmitting} />
      </div>
    </form>
  )
}
