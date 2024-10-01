import { supabase } from './supabase';
import store from '../redux/store';
import { setAuthUser, clearAuthUser } from '../redux/actions/authActions';
import { clearProfile, setProfile } from '../redux/actions/profileActions';

const { dispatch } = store;

export async function signedIn(session) {
    dispatch(setAuthUser(session));

    //Fetch user profile
    const accessToken = session.access_token;
    const { data: fetchedProfiles, error: profileError } = await supabase.functions.invoke('getProfile', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (profileError) {
        throw profileError;
    }
    //Set user profile in redux store
    const profile = fetchedProfiles.profile[0];
    dispatch(setProfile(profile));
}

export function signedOut() {
    dispatch(clearAuthUser());
    dispatch(clearProfile());
}