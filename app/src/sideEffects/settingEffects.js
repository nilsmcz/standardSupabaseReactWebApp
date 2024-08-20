import { supabase } from "../supabase/supabase";

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

        if (loginError) {
            throw new Error('old_password_incorrect');
        }

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