import { supabase } from './supabase';
import { setAuthUser, clearAuthUser } from '../redux/actions/authActions';
import store from '../redux/store';
import { signedIn, signedOut } from './sessionActions';

const { dispatch } = store;

const handleAuthStateChange = async (event, session) => {
    if (event === 'SIGNED_IN') {
        signedIn(session);
    } else if (event === 'SIGNED_OUT') {
        signedOut();
    }
};

supabase.auth.onAuthStateChange(handleAuthStateChange);
