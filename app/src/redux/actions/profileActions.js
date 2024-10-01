export const setProfile = (profileData) => ({
    type: 'SET_PROFILE',
    payload: profileData,
});

export const clearProfile = () => ({
    type: 'CLEAR_PROFILE',
});

export const updateProfilePicture = (profileData) => ({
    type: 'UPDATE_PROFILE_PICTURE',
    payload: profileData,
});