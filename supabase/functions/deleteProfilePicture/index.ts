import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

console.log(`Function "deleteProfilePicture" is now running!`);

Deno.serve(async (req) => {
  // Handle preflight OPTIONS request for CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Load Supabase environment variables
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    if (!SUPABASE_URL) {
      throw new Error("Environment variable 'SUPABASE_URL' is missing");
    }

    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
    if (!SUPABASE_ANON_KEY) {
      throw new Error("Environment variable 'SUPABASE_ANON_KEY' is missing");
    }

    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error(
        "Environment variable 'SUPABASE_SERVICE_ROLE_KEY' is missing",
      );
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get the Authorization token from the request header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authorization header is missing");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: authData, error: authError } = await supabase.auth.getUser(
      token,
    );

    if (authError) {
      throw new Error(`Authentication failed: ${authError.message}`);
    }

    const user = authData?.user;
    if (!user) {
      throw new Error("No user found for the provided token");
    }

    // Retrieve the old profile picture path from the database
    const { data: oldProfileData, error: selectError } = await supabase
      .from("user_profiles")
      .select("profile_picture_path")
      .eq("id", user.id);

    if (selectError) {
      throw new Error(
        `Failed to retrieve old profile data: ${selectError.message}`,
      );
    }

    const oldProfilePicturePath = oldProfileData?.[0]?.profile_picture_path;

    // Remove the old profile picture from storage
    if (oldProfilePicturePath) {
      const { error: removeError } = await supabase
        .storage
        .from("profile_pictures")
        .remove([oldProfilePicturePath]);

      if (removeError) {
        throw new Error(
          `Failed to remove old profile picture: ${removeError.message}`,
        );
      }
    }

    // Update the user's profile with the new picture URL and path
    const { error: updateError } = await supabase
      .from("user_profiles")
      .update({
        profile_picture_url: null,
        profile_picture_path: null,
      })
      .eq("id", user.id);

    if (updateError) {
      throw new Error(`Failed to update profile: ${updateError.message}`);
    }

    // Send success response
    return new Response(
      JSON.stringify({
        profile_picture_url: null,
        profile_picture_path: null,
        message: "Profile picture deleted successfully",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    // Send error response with detailed message
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    );
  }
});
