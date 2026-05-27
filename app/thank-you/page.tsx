import { CheckCircle2, Copy, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ThankYouPageProps {
  searchParams: Promise<{ id?: string }>
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const { id } = await searchParams

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50/60 to-white px-4 py-16">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-100">
          {/* Green top stripe */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-500" />

          <div className="px-8 py-10 text-center">
            {/* Animated checkmark */}
            <div className="mb-6 flex justify-center">
              <div className="relative flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-emerald-50" />
                <div className="absolute inset-0 animate-ping rounded-full bg-emerald-100 opacity-50" style={{ animationDuration: '2s', animationIterationCount: '1' }} />
                <CheckCircle2 className="relative h-10 w-10 text-emerald-500" />
              </div>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              You&apos;re all set!
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Thanks for reaching out. We&apos;ve received your details and will get back to you shortly.
            </p>

            {/* Submission ID */}
            {id && (
              <div className="mt-6 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-5 py-4 text-left">
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                  Submission ID
                </p>
                <p className="break-all font-mono text-xs text-gray-600">{id}</p>
                <p className="mt-2 text-[11px] text-gray-400">
                  Save this ID if you want to reference your submission.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Submit another response
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
