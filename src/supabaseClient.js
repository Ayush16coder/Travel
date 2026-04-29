import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hvnrbxufzpnnpahkogsy.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_p6Mm23pTZpFUpB2vIvvtog_gJU7Q96T'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
