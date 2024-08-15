import { supabase } from "../supabase/supabase";

export async function registerWithEmailPassword(email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        throw error;
    }
}