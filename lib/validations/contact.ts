import { z } from 'zod'

// Schema used for SERVER-SIDE validation + transforms
export const contactSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^\+?[\d\s\-().]{7,20}$/.test(v),
      'Enter a valid phone number'
    ),
  instagram: z.string().optional(),
  discord: z.string().optional(),
  telegram: z.string().optional(),
  message: z
    .string()
    .optional()
    .refine(
      (v) => !v || v.trim().split(/\s+/).filter(Boolean).length <= 3000,
      'Message must be 3,000 words or fewer'
    ),
})

// Client-side form field types (no transforms — raw input values)
export type ContactFormData = {
  email: string
  phone?: string
  instagram?: string
  discord?: string
  telegram?: string
  message?: string
}
