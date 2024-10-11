import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  // CORS OPTIONS request handling
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        ...corsHeaders,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
      },
      status: 204
    });
  }

  try {
    console.log("AAAAAAAAAAAAAAAA");

    // SUPABASE ENVIRONMENT VARIABLES
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    if (!SUPABASE_URL) {
      throw new Error("Missing environment variable: SUPABASE_URL");
    }

    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
    if (!SUPABASE_ANON_KEY) {
      throw new Error("Missing environment variable: SUPABASE_ANON_KEY");
    }

    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing environment variable: SUPABASE_SERVICE_ROLE_KEY");
    }

    console.log("BBBBBBBBBBBBBBBBBBBBBB");

    // CLIENT INITIALIZATION
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    console.log("CCCCCCCCCCCCCCCCCCCCCCCC");

    console.log(req);

    // Ensure we get valid JSON body
    const { email, password } = await req.json();

    console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing email or password" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400
      });
    }

    // 1. Benutzer registrieren
    const { data: user, error: userError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (userError) {
      return new Response(JSON.stringify({ error: userError.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400
      });
    }

    // 2. Zusätzliche Logik: Einfügen in eine Tabelle
    const { error: insertError } = await supabase
      .from('profiles')
      .insert([{ user_id: user.user?.id, created_at: new Date() }]);

    if (insertError) {
      return new Response(JSON.stringify({
        error: insertError.message
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400
      });
    }

    return new Response(JSON.stringify({ user }), { 
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500 });
  }
});
