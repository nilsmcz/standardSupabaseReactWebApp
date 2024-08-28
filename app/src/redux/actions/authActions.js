export const setAuthUser = (authData) => ({
    type: 'SET_AUTH_USER',
    payload: authData, // Übergibt die gesamte Antwort von Supabase
});

export const clearAuthUser = () => ({
    type: 'CLEAR_AUTH_USER',
});
