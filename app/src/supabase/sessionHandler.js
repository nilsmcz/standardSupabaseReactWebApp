import { supabase } from './supabase';
import { setAuthUser, clearAuthUser } from '../redux/actions/userActions';
import store from '../redux/store';

const { dispatch } = store;

const handleAuthStateChange = async (event, session) => {
    if (event === 'SIGNED_IN') {
        dispatch(setAuthUser(session.user));
    } else if (event === 'SIGNED_OUT') {
        dispatch(clearAuthUser());
    }
};

supabase.auth.onAuthStateChange(handleAuthStateChange);
