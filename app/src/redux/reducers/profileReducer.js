const initialProfileState = {
    profile: null,
};

const profileReducer = (state = initialProfileState, action) => {
    switch (action.type) {
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.payload,
            };
        case 'CLEAR_PROFILE':
            return {
                ...state,
                profile: null,
            };
        default:
            return state;
    }
};

export default profileReducer;
