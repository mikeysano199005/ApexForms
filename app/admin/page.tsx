import { supabaseAdmin } from '@/lib/supabase/admin'
import { ResponsesTable } from '@/components/admin/responses-table'
import { LogOut, LayoutDashboard, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default async function AdminPage() {
  const { data: submissions, error } = await supabaseAdmin
    .from('contact_submissions')
    .select('*')
    .order('submitted_at', { ascending: false })

  const total = submissions?.length ?? 0

  const recentCount = submissions?.filter((s) => {
    const d = new Date(s.submitted_at)
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 7)
    return d >= cutoff
  }).length ?? 0

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 shadow-sm shadow-blue-200">
              <LayoutDashboard className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold text-gray-900">Admin Panel</span>
                <span className="hidden shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-600 sm:inline">
                  Live
                </span>
              </div>
              <p className="hidden text-xs text-gray-400 sm:block">Contact Form Responses</p>
            </div>
          </div>

          <Link
            href="/api/admin/logout"
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">

        {/* Page heading */}
        <div className="mb-5">
          <h1 className="text-lg font-bold text-gray-900 sm:text-xl">Contact Responses</h1>
          <p className="mt-0.5 text-sm text-gray-400">All form submissions, newest first</p>
        </div>

        {/* Stats */}
        <div className="mb-5 grid grid-cols-2 gap-3 sm:gap-4 max-w-xs sm:max-w-sm">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 sm:mb-3 sm:h-9 sm:w-9">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-xl font-bold text-gray-900 sm:text-2xl">{error ? '—' : total}</p>
            <p className="mt-0.5 text-xs text-gray-400">Total responses</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 sm:mb-3 sm:h-9 sm:w-9">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-xl font-bold text-gray-900 sm:text-2xl">{error ? '—' : recentCount}</p>
            <p className="mt-0.5 text-xs text-gray-400">Last 7 days</p>
          </div>
        </div>

        {/* Table card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3.5 sm:px-6 sm:py-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">All Submissions</h2>
              <p className="mt-0.5 hidden text-xs text-gray-400 sm:block">
                Click email to compose · Copy icon for full UUID
              </p>
            </div>
            {!error && total > 0 && (
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
                {total} {total === 1 ? 'entry' : 'entries'}
              </span>
            )}
          </div>

          {error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm font-medium text-red-500">Failed to load responses</p>
              <p className="mt-1 text-xs text-gray-400">Check your Supabase configuration</p>
            </div>
          ) : (
            <ResponsesTable submissions={submissions ?? []} />
          )}
        </div>
      </main>
    </div>
  )
}
