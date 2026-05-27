'use client'

import { useState } from 'react'
import { Copy, Check, Mail, Phone, AtSign, Hash, Send, ExternalLink, MessageSquare } from 'lucide-react'

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

interface ResponseRowProps {
  submission: Submission
  index: number
}

function Dash() {
  return <span className="text-gray-200">—</span>
}

const cell = 'whitespace-nowrap px-4 py-3 sm:px-5 sm:py-4'

export function ResponseRow({ submission, index }: ResponseRowProps) {
  const [copied, setCopied] = useState(false)

  async function copyId() {
    await navigator.clipboard.writeText(submission.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const date = new Date(submission.submitted_at)
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <tr className="group transition-colors hover:bg-blue-50/30">

      {/* # */}
      <td className={`${cell} text-xs text-gray-300`}>{index + 1}</td>

      {/* ID */}
      <td className={cell}>
        <div className="flex items-center gap-1.5">
          <span
            title={submission.id}
            className="cursor-default rounded-lg bg-gray-100 px-2 py-1 font-mono text-[11px] text-gray-500"
          >
            {submission.id.slice(0, 8)}…
          </span>
          <button
            onClick={copyId}
            title="Copy full ID"
            className="rounded-md p-1 text-gray-300 opacity-0 transition-all group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-600"
          >
            {copied
              ? <Check className="h-3.5 w-3.5 text-emerald-500" />
              : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </td>

      {/* Email */}
      <td className={cell}>
        <a
          href={`mailto:${submission.email}`}
          className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          <Mail className="h-3.5 w-3.5 shrink-0 text-blue-400" />
          {submission.email}
        </a>
      </td>

      {/* Phone */}
      <td className={`${cell} text-sm`}>
        {submission.phone ? (
          <div className="flex items-center gap-1.5 text-gray-700">
            <Phone className="h-3.5 w-3.5 shrink-0 text-gray-300" />
            {submission.phone}
          </div>
        ) : <Dash />}
      </td>

      {/* Instagram */}
      <td className={`${cell} text-sm`}>
        {submission.instagram ? (
          <a
            href={`https://instagram.com/${submission.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-pink-500 hover:text-pink-600 hover:underline"
          >
            <AtSign className="h-3.5 w-3.5 shrink-0" />
            {submission.instagram}
            <ExternalLink className="h-3 w-3 text-pink-300" />
          </a>
        ) : <Dash />}
      </td>

      {/* Discord */}
      <td className={`${cell} text-sm`}>
        {submission.discord ? (
          <div className="flex items-center gap-1.5 text-indigo-500">
            <Hash className="h-3.5 w-3.5 shrink-0" />
            {submission.discord}
          </div>
        ) : <Dash />}
      </td>

      {/* Telegram */}
      <td className={`${cell} text-sm`}>
        {submission.telegram ? (
          <a
            href={`https://t.me/${submission.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sky-500 hover:text-sky-600 hover:underline"
          >
            <Send className="h-3.5 w-3.5 shrink-0" />
            {submission.telegram}
            <ExternalLink className="h-3 w-3 text-sky-300" />
          </a>
        ) : <Dash />}
      </td>

      {/* Message */}
      <td className="px-4 py-3 text-sm sm:px-5 sm:py-4" style={{ maxWidth: '200px' }}>
        {submission.message ? (
          <div className="flex items-start gap-1.5">
            <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-300" />
            <span className="line-clamp-2 text-gray-600" title={submission.message}>
              {submission.message}
            </span>
          </div>
        ) : <Dash />}
      </td>

      {/* Submitted */}
      <td className={`${cell} text-right text-sm`}>
        <div className="text-gray-600">{formattedDate}</div>
        <div className="text-xs text-gray-400">{formattedTime}</div>
      </td>

    </tr>
  )
}
