const initialAuthState = {
    auth: null,
};

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case 'SET_AUTH_USER':
            return {
                ...state,
                auth: action.payload,
            };
        case 'CLEAR_AUTH_USER':
            return {
                ...state,
                auth: null,
            };
        default:
            return state;
    }
};

export default authReducer;
