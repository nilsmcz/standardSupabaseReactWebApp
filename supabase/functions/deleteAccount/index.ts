import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

console.log(`Function "deleteAccount" up and running!`);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
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
      throw new Error(
        "Missing environment variable: SUPABASE_SERVICE_ROLE_KEY",
      );
    }

    // CLIENT INITIALIZATION
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // AUTHENTICATION: Get the token from the Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authorization header is missing");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data, error: authError } = await supabase.auth.getUser(token);

    if (authError) {
      throw new Error(`Authentication failed: ${authError.message}`);
    }

    const user = data?.user;
    if (!user) {
      throw new Error("No user found from token");
    }

    // ACTION: Delete user from auth (hard delete)
    const { data: deleteData, error: deleteError } = await supabase.auth.admin.deleteUser(
      user.id, false, //false = hard delete
    )
    if (deleteError) {
      throw new Error(`Error deleting user: ${deleteError.message}`);
    }

    // RESPONSE: Erfolgreiche Antwort senden
    return new Response(
      JSON.stringify({
        message: "User successfully deleted",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    // FEHLERMELDUNG: Detaillierte Fehlermeldung im Response
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
