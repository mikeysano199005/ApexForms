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

  // Count responses from last 7 days
  const recentCount = submissions?.filter((s) => {
    const d = new Date(s.submitted_at)
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 7)
    return d >= cutoff
  }).length ?? 0

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* Top nav */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-sm shadow-blue-200">
              <LayoutDashboard className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-900">Admin Panel</span>
              <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-600">
                Live
              </span>
            </div>
          </div>

          <Link
            href="/api/admin/logout"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Contact Responses</h1>
          <p className="mt-0.5 text-sm text-gray-400">All form submissions, newest first</p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-2 max-w-sm">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
              <Users className="h-4.5 w-4.5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{error ? '—' : total}</p>
            <p className="mt-0.5 text-xs text-gray-400">Total responses</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
              <TrendingUp className="h-4.5 w-4.5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{error ? '—' : recentCount}</p>
            <p className="mt-0.5 text-xs text-gray-400">Last 7 days</p>
          </div>
        </div>

        {/* Table card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Table header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">All Submissions</h2>
              <p className="mt-0.5 text-xs text-gray-400">
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
