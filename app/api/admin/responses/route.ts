import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  // Guard: only allow if admin cookie is set (middleware handles this too,
  // but this is a defence-in-depth check for the API route itself)
  const auth = req.cookies.get('admin_auth')
  if (auth?.value !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabaseAdmin
    .from('contact_submissions')
    .select('*')
    .order('submitted_at', { ascending: false })

  if (error) {
    console.error('Supabase fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch responses' }, { status: 500 })
  }

  return NextResponse.json({ responses: data }, { status: 200 })
}
