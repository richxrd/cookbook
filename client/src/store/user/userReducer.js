const userReducer = (
    state = { authData: null, userData: null, recipes: null },
    action
) => {
    switch (action.type) {
        case "AUTH":
            localStorage.setItem(
                "profile",
                JSON.stringify({
                    ...state,
                    authData: { ...action?.data },
                })
            );
            return { ...state, authData: { ...action?.data } };
        case "LOGOUT":
            localStorage.clear();
            return { ...state, authData: null };
        case "UPDATE":
            localStorage.setItem(
                "profile",
                JSON.stringify({
                    ...state,
                    authData: { result: { ...action?.data.result } },
                })
            );
            return {
                ...state,
                authData: { result: { ...action?.data.result } },
            };
        case "GET_USER":
            localStorage.setItem(
                "profile",
                JSON.stringify({
                    ...state,
                    userData: {
                        result: action?.data.result,
                        recipes: action?.data.recipes,
                    },
                })
            );
            return {
                ...state,
                userData: {
                    result: action?.data.result,
                    recipes: action?.data.recipes,
                },
            };
        case "FOLLOW":
            localStorage.setItem(
                "profile",
                JSON.stringify({
                    ...state,
                    userData: { result: action?.data.user },
                    authData: { result: action?.data.auth },
                })
            );
            return {
                ...state,
                userData: { result: action?.data.user },
                authData: { result: action?.data.auth },
            };
        default:
            return state;
    }
};
export default userReducer;
