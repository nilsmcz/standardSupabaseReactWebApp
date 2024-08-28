import { supabase } from './supabase';
import { setAuthUser, clearAuthUser } from '../redux/actions/authActions';
import store from '../redux/store';

const { dispatch } = store;

const handleAuthStateChange = async (event, session) => {
    if (event === 'SIGNED_IN') {
        dispatch(setAuthUser(session));
    } else if (event === 'SIGNED_OUT') {
        dispatch(clearAuthUser());
    }
};

supabase.auth.onAuthStateChange(handleAuthStateChange);
