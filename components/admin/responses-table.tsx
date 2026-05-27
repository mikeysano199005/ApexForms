import { ResponseRow } from './response-row'
import { Inbox } from 'lucide-react'

interface Submission {
  id: string
  email: string
  phone: string | null
  instagram: string | null
  discord: string | null
  telegram: string | null
  message: string | null
  submitted_at: string
  ip_address: string | null
}

interface ResponsesTableProps {
  submissions: Submission[]
}

const headers = ['#', 'ID', 'Email', 'Phone', 'Instagram', 'Discord', 'Telegram', 'Message', 'Submitted']

export function ResponsesTable({ submissions }: ResponsesTableProps) {
  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
          <Inbox className="h-6 w-6 text-gray-400" />
        </div>
        <p className="text-sm font-semibold text-gray-500">No responses yet</p>
        <p className="mt-1 max-w-xs text-xs text-gray-400">
          Submissions will appear here once people fill out your form.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            {headers.map((h) => (
              <th
                key={h}
                className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {submissions.map((submission, i) => (
            <ResponseRow key={submission.id} submission={submission} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
