import { supabase } from "../supabase/supabase";
import { v4 as uuidv4 } from 'uuid';
import store from '../redux/store';
import { updateProfilePicture, clearProfilePicture, clearProfile } from "../redux/actions/profileActions";
import { checkAuthSession } from "../utils";
import { clearAuthUser } from "../redux/actions/authActions";
import { logout } from "./authEffects";
const { dispatch } = store;
/**
 * Updates the user's email address.
 *
 * This function changes the user's email to the provided new email address.
 * It interacts with Supabase's authentication system to update the email.
 *
 * @async
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
 * @async
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
 * @async
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

/**
 * Updates the user's profile picture by uploading a new image to Supabase.
 *
 * This function handles the process of uploading a new profile picture to Supabase's
 * storage or function service. It generates a unique file name for the image using
 * a UUID, appends the file to a `FormData` object, and invokes a Supabase function
 * (`setProfilePicture`) to store the image. The access token is required for
 * authentication, and the Redux store is updated with the new profile picture
 * upon success.
 *
 * @async
 * @param {File} file - The new profile picture file to be uploaded. Must be an image file.
 * @returns {Promise<Object>} - Returns the response data from the Supabase function if successful.
 * @throws {Error} - Throws an error if the access token is missing, the file is missing, or the upload fails.
 */
export async function changeProfilePicture(file) {
    const accessToken = checkAuthSession();

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

/**
 * Deletes the user's profile picture.
 *
 * This function invokes a Supabase server function to delete the user's profile picture.
 * It requires a valid access token for authorization and updates the Redux store
 * by clearing the profile picture from the local state.
 *
 * @async
 * @returns {Promise<Object>} - Returns the response data from the Supabase function if successful.
 * @throws {Error} - Throws an error if the access token is missing or if the profile picture deletion fails.
 */
export async function deleteProfilePicture() {
    const accessToken = checkAuthSession();

    try {
        const { data, error } = await supabase.functions.invoke('deleteProfilePicture', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        if (error) {
            throw error;
        }

        dispatch(clearProfilePicture())

        return data
    } catch (error) {
        throw error;
    }
}

/**
 * Deletes the user's account permanently.
 *
 * This function invokes a Supabase function to perform a hard delete of the user's account.
 * It requires a valid access token to authorize the action and logs the user out
 * upon successful account deletion. Additionally, the Redux store's authentication
 * state is cleared.
 *
 * @async
 * @function deleteAccount
 * @returns {Promise<Object>} - Returns the response data from the Supabase function if the account deletion is successful.
 * @throws {Error} - Throws an error if the access token is missing or if the deletion process fails.
 */
export async function deleteAccount() {
    const accessToken = checkAuthSession();

    try{
        const { data, error } = await supabase.functions.invoke('deleteAccount', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        if (error) {
            throw error;
        }

        logout();

        return data;
    } catch (error) {
        throw error;
    }
}