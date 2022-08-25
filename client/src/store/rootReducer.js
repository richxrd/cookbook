import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import postsReducer from "./posts/postsReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    posts: postsReducer,
});
