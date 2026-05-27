import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations/contact'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues },
      { status: 422 }
    )
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    null
  const userAgent = req.headers.get('user-agent') ?? null

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert({
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      instagram: parsed.data.instagram ?? null,
      discord: parsed.data.discord ?? null,
      telegram: parsed.data.telegram ?? null,
      message: parsed.data.message?.trim() || null,
      ip_address: ip,
      user_agent: userAgent,
    })
    .select('id')
    .single()

  if (error) {
    console.error('Supabase insert error:', error)
    return NextResponse.json(
      { error: 'Failed to save your response. Please try again.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, id: data.id }, { status: 201 })
}
