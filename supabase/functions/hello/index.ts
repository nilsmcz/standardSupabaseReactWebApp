import { serve } from 'https://deno.land/std@0.140.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  try {
    const { param1, param2 } = await req.json()

    // Beispielhafte Verarbeitung der Parameter
    const result = param1 + param2

    console.log('Result:', result)

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
