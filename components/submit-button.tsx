import { Loader2, ArrowRight } from 'lucide-react'

interface SubmitButtonProps {
  isLoading: boolean
  label?: string
}

export function SubmitButton({ isLoading, label = 'Submit' }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Sending your message…</span>
        </>
      ) : (
        <>
          <span>{label}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </>
      )}
    </button>
  )
}
