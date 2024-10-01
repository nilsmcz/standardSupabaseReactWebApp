import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import {
  FormFile,
  multiParser,
} from "https://deno.land/x/multiparser@0.114.0/mod.ts";

console.log(`Function "setProfilePicture" up and running!`);

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

    // ACTION: upload 'image' to "profile_pictures" storage

    const form = await multiParser(req);
    if (!form) {
      return new Response(
        JSON.stringify({ success: false, error: "no file found" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    const image: FormFile = form.files.image as FormFile;

    const { data: result, error: uploadError } = await supabase.storage.from(
      "profile_pictures",
    ).upload(image.filename, image.content!.buffer, {
      contentType: image.contentType,
      cacheControl: "3600",
      upsert: false,
    });

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const path = result?.path;

    const { data: imageUrl } = supabase
      .storage
      .from("profile_pictures")
      .getPublicUrl(path);

    const url = imageUrl?.publicUrl;

    const { data: oldData, error: oldError } = await supabase
      .from("user_profiles")
      .select("profile_picture_path")
      .eq("id", user.id);

    if (oldError) {
      throw new Error(`Database select error: ${oldError.message}`);
    }

    const oldPath = oldData?.[0]?.profile_picture_path;

    const { error: insertError } = await supabase
      .from("user_profiles")
      .update({
        profile_picture_url: url,
        profile_picture_path: path,
      })
      .eq("id", user.id);

    if (insertError) {
      console.error("Insert error: ", insertError);
      throw new Error(`Database insert error: ${insertError.message}`);
    }

    const { data: removeData, error: removeError } = await supabase
      .storage
      .from("profile_pictures")
      .remove([oldPath]);

    if (removeError) {
      console.error("Remove error: ", removeError);
      throw new Error(`Storage remove error: ${removeError.message}`);
    }

    // RESPONSE: Erfolgreiche Antwort senden
    return new Response(
      JSON.stringify({
        url: url,
        message: "Profile picture successfully uploaded",
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
