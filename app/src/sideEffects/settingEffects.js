import { supabase } from "../supabase/supabase";

export async function changeEmail(newEmail) {
    try {
        const { data, error } = await supabase.auth.updateUser({ email: newEmail })
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        throw error;
    }
}