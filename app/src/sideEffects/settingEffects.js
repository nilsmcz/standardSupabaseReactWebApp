import { supabase } from "../supabase/supabase";
import { v4 as uuidv4 } from 'uuid';
import store from '../redux/store';
import { updateProfilePicture } from "../redux/actions/profileActions";
const { dispatch } = store;
/**
 * Updates the user's email address.
 *
 * This function changes the user's email to the provided new email address.
 * It interacts with Supabase's authentication system to update the email.
 *
 * @param {string} newEmail - The new email address to set for the user.
 * @returns {Promise<Object>} - Returns the updated user data if the email change is successful.
 * @throws {Error} - Throws an error if the email update fails for any reason.
 */
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

/**
 * Changes the user's password if the old password is provided correctly.
 *
 * This function first authenticates the user using their email and old password.
 * If the authentication is successful, the password is then updated to the new one.
 *
 * @param {string} email - The email address of the user.
 * @param {string} oldPassword - The user's current password.
 * @param {string} newPassword - The new password to set for the user.
 * @returns {Promise<Object>} - Returns the data from the password update if successful.
 * @throws {Error} - Throws an error if the old password is incorrect or if there's an issue with the update.
 */
export async function changePassword(email, oldPassword, newPassword) {
    try {
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email: email,
            password: oldPassword,
        });

        if (loginError) throw loginError;

        const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        throw error;
    }
}

/**
 * Changes the user's phone number in the Supabase authentication system.
 * 
 * Note: To ensure this function works properly, the SMS provider must be enabled 
 * in Supabase, as phone number verification typically occurs via SMS.
 *
 * @param {string} newPhoneNumber - The new phone number to be set for the user.
 * @returns {Object} The updated user data if the phone number change is successful.
 * @throws Will throw an error if the update fails.
 */
export async function changePhoneNumber(newPhoneNumber) {
    try {
        const { data, error } = await supabase.auth.updateUser({ phone: newPhoneNumber })
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        throw error;
    }
}

export async function changeProfilePicture(accessToken, file) {
    if (!accessToken) {
        throw new Error('Access token is required to change profile picture');
    }
    if (!file) {
        throw new Error('New profile picture is required to change profile picture');
    }

    try {
        const newUuid = uuidv4();
        const fileExt = file.name.split('.').pop();
        const filePath = `${newUuid}.${fileExt}`;

        const formData = new FormData();
        formData.append("image", file, filePath);

        const { data, error } = await supabase.functions.invoke('setProfilePicture', {
            body: formData,
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        if (error) {
            throw error;
        }

        dispatch(updateProfilePicture(data));

        return data;
    } catch (error) {
        throw error;
    }
}