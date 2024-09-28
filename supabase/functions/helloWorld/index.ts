import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

console.log(`Function "helloWorld" up and running!`);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    //INPUT PARAMS
    // const { name, number } = await req.json();

    //SUPABESE
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    if (!SUPABASE_URL) {
      throw new Error("No_SUPABASE_URL");
    }
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
    if (!SUPABASE_ANON_KEY) {
      throw new Error("No_SUPABASE_ANON_KEY");
    }
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("No_SUPABASE_SERVICE_ROLE_KEY");
    }

    //CLIENT
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get the session or user object
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabase.auth.getUser(token);
    const user = data.user;

    if (!user) {
      console.error("No_User_Found");
      throw new Error("No_User_Found");
    }

    //ACTION
    const { error: insertError } = await supabase
      .from("user_profiles")
      .insert([{ id: user.id }]);

    if (insertError) {
      console.error("Insert_Error: ", insertError);
      throw new Error("Insert_Error");
    }
    //END_ACTION

    return new Response(JSON.stringify({ supabase, user }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
