const postsReducer = (
    state = { recipeData: null, newRecipe: null, error: null },
    action
) => {
    switch (action.type) {
        case "CREATE":
            return { ...state, newRecipe: { ...action?.data.post } };
        case "FETCH_POST":
            return { ...state, recipeData: { ...action?.data.post } };
        case "CLEAR_NEW_POST":
            return { ...state, newRecipe: null };
        case "CLEAR_CURRENT_POST":
            return { ...state, recipeData: null };
        default:
            return state;
    }
};

export default postsReducer;
