const userReducer = (state = { authData: null, userData: null }, action) => {
    switch (action.type) {
        case "AUTH":
            localStorage.setItem(
                "profile",
                JSON.stringify({ ...action?.data })
            );
            return { ...state, authData: action?.data };
        case "LOGOUT":
            localStorage.clear();
            return { ...state, authData: null };
        case "UPDATE":
            localStorage.setItem(
                "profile",
                JSON.stringify({ ...action?.data })
            );
            return {
                ...state,
                authData: action?.data,
            };
        case "GET_USER":
            return {
                ...state,
                userData: action?.data,
            };
        default:
            return state;
    }
};
export default userReducer;
