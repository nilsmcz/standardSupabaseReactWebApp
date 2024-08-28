//Documentation: https://supabase.com/docs/guides/functions/auth#auth-context
import "https://deno.land/std@0.140.0/dotenv/load.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req: Request) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    );

    console.log("supabaseClient:", supabaseClient);
    console.log("req:", req);
    console.log("req.headers:", req.headers);

    // Get the session or user object
    const authHeader = req.headers.get("Authorization")!;
    console.log("authHeader:", authHeader);
    const token = authHeader.replace("Bearer", "");
    // const { data } = await supabaseClient.auth.getUser(token);
    // const user = data.user;

    // Benutzer-Informationen abrufen
    // const { data: authData, error: authError } = await supabaseClient.auth
    //   .getUser(
    //     token,
    //   );
    // if (authError || !authData.user) {
    //   throw authError || new Error("Failed to retrieve user");
    // }

    // const userId = authData.user.id;

    // Leeren Eintrag in der profiles-Tabelle erstellen mit Row Level Security (RLS)
    // const { data: profileData, error: profileError } = await supabaseClient
    //   .from("profiles")
    //   .insert([{ user_id: userId }]);

    // if (profileError) {
    //   throw profileError;
    // }

    // Erfolgsmeldung zurückgeben
    // return new Response(JSON.stringify({ success: true, profileData }), {
    //   headers: { ...corsHeaders, "Content-Type": "application/json" },
    //   status: 200,
    // });

    return new Response(JSON.stringify({ success: true, authHeader }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    );
  }
});
