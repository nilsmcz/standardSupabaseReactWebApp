const initialAuthState = {
    user: null, // Speichert die Benutzerinformationen
    session: {
        accessToken: null,
        refreshToken: null,
        expiresAt: null,
    },
};

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case 'SET_AUTH_USER':
            return {
                ...state,
                user: action.payload.user, // Benutzerinformationen aus action.payload.user
                session: {
                    accessToken: action.payload.access_token,
                    refreshToken: action.payload.refresh_token,
                    expiresAt: action.payload.expires_at,
                },
            };
        case 'CLEAR_AUTH_USER':
            return {
                ...state,
                user: null,
                session: {
                    accessToken: null,
                    refreshToken: null,
                    expiresAt: null,
                },
            };
        default:
            return state;
    }
};

export default authReducer;