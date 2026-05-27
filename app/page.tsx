import { ContactForm } from '@/components/contact-form'
import { MessageSquareHeart, ShieldCheck } from 'lucide-react'

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50/60 to-white px-4 py-16">
      <div className="w-full max-w-lg">

        {/* Header above the card */}
        <div className="mb-6 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-200">
            <MessageSquareHeart className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Get in touch
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Fill in your details and we&apos;ll reach out to you.
          </p>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-100">
          {/* Blue top stripe */}
          <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-600" />

          {/* Form body */}
          <div className="px-8 py-8">
            <ContactForm />
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <ShieldCheck className="h-3.5 w-3.5 text-gray-300" />
          <span>Your information is private and never shared</span>
        </div>
      </div>
    </main>
  )
}
