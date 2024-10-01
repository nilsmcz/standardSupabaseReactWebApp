import { supabase } from './supabase';
import { signedIn, signedOut } from './sessionActions';

const handleAuthStateChange = async (event, session) => {
    if (event === 'SIGNED_IN') {
        signedIn(session);
    } else if (event === 'SIGNED_OUT') {
        signedOut();
    }
};

supabase.auth.onAuthStateChange(handleAuthStateChange);
