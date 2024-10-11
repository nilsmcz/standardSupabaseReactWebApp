import { supabase } from "../supabase/supabase";
import store from '../redux/store';
import { setProfileLoading } from "../redux/actions/profileActions";
import { checkAuthSession } from "../utils";
const { dispatch } = store;

/**
 * Registers a new user with the provided email and password.
 * 
 * @param {string} email - The email address of the new user.
 * @param {string} password - The password for the new user.
 * @returns {Promise<Object>} - A Promise that resolves to an object containing the `user` and `session` data. 
 *                              The `user` object contains information about the registered user, 
 *                              and the `session` object contains authentication details such as tokens and expiration.
 * @throws {Error} - Throws an error if the registration fails.
 */
export async function registerWithEmailPassword(email, password) {
    try {
        dispatch(setProfileLoading(true));

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) {
            throw signUpError;
        }

        const accessToken = checkAuthSession();

        const { data: funcData, error: funcError } = await supabase.functions.invoke('setUpProfile', {
            body: JSON.stringify({ email }),
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if(funcError) {
            throw funcError;
        }

        dispatch(setProfileLoading(false));
        return signUpData;
    } catch (error) {
        throw error;
    }
}

/**
 * Logs in a user with the provided email and password.
 * 
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user.
 * @returns {Promise<Object>} - A Promise that resolves to an object containing the `user` and `session` data. 
 *                              The `user` object contains information about the logged-in user, 
 *                              and the `session` object contains authentication details such as tokens and expiration.
 * @throws {Error} - Throws an error if the login fails.
 */
export async function loginWithEmailPassword(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        throw error;
    }
}

/**
 * Logs out the currently logged-in user.
 * 
 * @returns {Promise<boolean>} - A Promise that resolves to `true` if the logout was successful.
 * @throws {Error} - Throws an error if the logout fails.
 */
export async function logout() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }
        return true
    } catch (error) {
        throw error;
    }
}

/**
 * Sends a password reset email to the specified email address using Supabase authentication.
 *
 * @param {string} email - The email address to send the password reset link to.
 * @returns {Promise<Object>} A promise that resolves to the response data from Supabase if successful.
 * @throws {Error} Throws an error if the password reset request fails or if there is an issue with Supabase.
 */
export async function sendPasswordResetEmail(email) {
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        throw error;
    }
}