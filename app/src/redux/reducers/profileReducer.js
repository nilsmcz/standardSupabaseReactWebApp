const initialProfileState = {
    loading: false,
    profile_picture_url: null,
    profile_picture_path: null
};

const profileReducer = (state = initialProfileState, action) => {
    switch (action.type) {
        case 'SET_PROFILE':
            return {
                ...state,
                profile_picture_url: action.payload.profile_picture_url,
                profile_picture_path: action.payload.profile_picture_path
            };
        case 'CLEAR_PROFILE':
            return {
                ...state,
                profile_picture_url: null,
                profile_picture_path: null
            };
        case 'UPDATE_PROFILE_PICTURE':
            return {
                ...state,
                profile_picture_url: action.payload.profile_picture_url,
                profile_picture_path: action.payload.profile_picture_path
            };
        case 'CLEAR_PROFILE_PICTURE':
            return {
                ...state,
                profile_picture_url: null,
                profile_picture_path: null
            };
        case 'SET_PROFILE_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};

export default profileReducer;
