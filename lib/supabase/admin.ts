import { createClient } from '@supabase/supabase-js'

// Server-only — never import this in client components or pages
// Uses the service role key which bypasses Row Level Security
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
