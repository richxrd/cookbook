import * as api from "../../api";

export const newPost = (formData) => async (dispatch) => {
    try {
        const { data } = await api.newPost(formData);
        dispatch({ type: "CREATE", data });
    } catch (error) {}
};

export const getPost = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchPost(id);
        dispatch({ type: "FETCH_POST", data });
        dispatch({ type: "POST_FOUND", data });
    } catch (error) {}
};
