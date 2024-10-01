export const setProfile = (profileData) => ({
    type: 'SET_PROFILE',
    payload: profileData,
});

export const clearProfile = () => ({
    type: 'CLEAR_PROFILE',
});