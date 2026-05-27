import { UseFormRegisterReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel'
  placeholder?: string
  optional?: boolean
  hint?: string
  error?: string
  icon?: LucideIcon
  registration: UseFormRegisterReturn
}

export function FormField({
  label,
  type = 'text',
  placeholder,
  optional = false,
  hint,
  error,
  icon: Icon,
  registration,
}: FormFieldProps) {
  return (
    <div className="group flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-800">
          {label}
          {!optional && <span className="ml-0.5 text-blue-500">*</span>}
        </label>
        {optional && (
          <span className="text-xs text-gray-400">Optional</span>
        )}
      </div>

      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
            <Icon
              className={cn(
                'h-4 w-4 transition-colors duration-150',
                error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-500'
              )}
            />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          className={cn(
            'w-full rounded-xl border py-3 text-sm text-gray-900 outline-none transition-all duration-150',
            'placeholder:text-gray-300',
            Icon ? 'pl-10 pr-4' : 'px-4',
            error
              ? 'border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-3 focus:ring-red-100'
              : 'border-gray-200 bg-white focus:border-blue-400 focus:ring-3 focus:ring-blue-50 hover:border-gray-300'
          )}
          {...registration}
        />
      </div>

      {hint && !error && (
        <p className="text-xs text-gray-400">{hint}</p>
      )}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <span className="inline-block h-1 w-1 rounded-full bg-red-400" />
          {error}
        </p>
      )}
    </div>
  )
}
