const initialState = {
    user: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_AUTH_USER':
        return {
          ...state,
          user: action.payload
        };
      case 'CLEAR_AUTH_USER':
        return {
          ...state,
          user: null
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  