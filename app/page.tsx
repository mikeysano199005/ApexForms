import { ContactForm } from '@/components/contact-form'
import { MessageSquareHeart, ShieldCheck } from 'lucide-react'

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50/60 to-white px-4 py-10 sm:py-16">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-5 text-center sm:mb-6">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-200 sm:h-14 sm:w-14">
            <MessageSquareHeart className="h-6 w-6 text-white sm:h-7 sm:w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Get in touch
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Fill in your details and we&apos;ll reach out to you.
          </p>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-100">
          <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-600" />
          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <ContactForm />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <ShieldCheck className="h-3.5 w-3.5 text-gray-300" />
          <span>Your information is private and never shared</span>
        </div>
      </div>
    </main>
  )
}
