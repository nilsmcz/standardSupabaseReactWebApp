import { createClient } from 'jsr:@supabase/supabase-js@2'
import { serve } from 'https://deno.land/std@0.140.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  try {
    // Auth-Header aus der Anfrage extrahieren
    const authHeader = req.headers.get('Authorization');
    
    // Supabase-Client mit Auth-Kontext erstellen
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader! } } }
    );

    // Nutzer-Token aus dem Header extrahieren
    const token = authHeader?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Authorization token is missing');
    }

    // Benutzer-Informationen abrufen
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authData.user) {
      throw authError || new Error('Failed to retrieve user');
    }

    const userId = authData.user.id;

    // Leeren Eintrag in der profiles-Tabelle erstellen mit Row Level Security (RLS)
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert([{ user_id: userId }]);  // Leerer Eintrag mit user_id

    if (profileError) {
      throw profileError;
    }

    // Erfolgsmeldung zurückgeben
    return new Response(JSON.stringify({ success: true, profileData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
