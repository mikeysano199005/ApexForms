'use client'

import { UseFormRegisterReturn } from 'react-hook-form'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const MAX_WORDS = 3000

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

interface TextareaFieldProps {
  label: string
  name: string
  placeholder?: string
  optional?: boolean
  error?: string
  registration: UseFormRegisterReturn
}

export function TextareaField({
  label,
  placeholder,
  optional = false,
  error,
  registration,
}: TextareaFieldProps) {
  const [wordCount, setWordCount] = useState(0)
  const isNearLimit = wordCount >= MAX_WORDS * 0.9
  const isAtLimit = wordCount >= MAX_WORDS

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setWordCount(e.target.value ? countWords(e.target.value) : 0)
    // Call the original react-hook-form onChange
    registration.onChange(e)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-800">
          {label}
          {!optional && <span className="ml-0.5 text-blue-500">*</span>}
        </label>
        {optional && <span className="text-xs text-gray-400">Optional</span>}
      </div>

      <textarea
        placeholder={placeholder}
        rows={6}
        className={cn(
          'w-full resize-y rounded-xl border px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-150',
          'placeholder:text-gray-300 leading-relaxed',
          error
            ? 'border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-3 focus:ring-red-100'
            : 'border-gray-200 bg-white focus:border-blue-400 focus:ring-3 focus:ring-blue-50 hover:border-gray-300'
        )}
        {...registration}
        onChange={handleChange}
      />

      {/* Word counter + error row */}
      <div className="flex items-center justify-between">
        <div>
          {error && (
            <p className="flex items-center gap-1 text-xs text-red-500">
              <span className="inline-block h-1 w-1 rounded-full bg-red-400" />
              {error}
            </p>
          )}
        </div>
        <p
          className={cn(
            'text-xs tabular-nums transition-colors',
            isAtLimit
              ? 'font-semibold text-red-500'
              : isNearLimit
              ? 'font-medium text-amber-500'
              : 'text-gray-400'
          )}
        >
          {wordCount.toLocaleString()} / {MAX_WORDS.toLocaleString()} words
        </p>
      </div>
    </div>
  )
}
