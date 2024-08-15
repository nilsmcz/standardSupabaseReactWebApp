import { supabase } from "./supabase";
//redux user store

const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
    //LOGIK HIER
});