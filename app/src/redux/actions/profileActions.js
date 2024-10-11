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

export const clearProfilePicture = () => ({
    type: 'CLEAR_PROFILE_PICTURE',
});

export const setProfileLoading = (loading) => ({
    type: 'SET_PROFILE_LOADING',
    payload: loading,
});