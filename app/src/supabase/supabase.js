import { createClient } from "@supabase/supabase-js"

const isLocal = process.env.SUPABASE_LOCAL === 'true' || false

let supabaseUrl = ''
let supabaseKey = ''

if (isLocal) {
    supabaseUrl = 'http://127.0.0.1:54321'
    supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY_LOCAL
}
else {
    supabaseUrl = process.env.REACT_APP_SUPABASE_URL
    supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY
}

export const supabase = createClient(supabaseUrl, supabaseKey);