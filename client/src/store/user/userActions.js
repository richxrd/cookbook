import * as api from "../../api";

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: "AUTH", data });
        navigate("/");
    } catch (error) {}
};

export const updatebio = (newBio, navigate) => async (dispatch) => {
    try {
        const { data } = await api.updateBio(newBio);

        dispatch({ type: "UPDATE", data });
        navigate(0);
    } catch (error) {}
};

export const getUser = (uniqueId, navigate) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(uniqueId);
        dispatch({ type: "GET_USER", data });
        navigate(0);
    } catch (error) {}
};

export const addCollection = (collectionName, navigate) => async (dispatch) => {
    try {
        const { data } = await api.addCollection(collectionName);
        dispatch({ type: "UPDATE", data });
        navigate(0);
    } catch (error) {}
};

export const deleteCollection =
    (collectionName, navigate) => async (dispatch) => {
        try {
            const { data } = await api.deleteCollection(collectionName);
            dispatch({ type: "UPDATE", data });
            navigate(`/user/${data.result.uniqueId}`);
        } catch (error) {}
    };

export const followUser = (form, navigate) => async (dispatch) => {
    try {
        const { data } = await api.followUser(form);
        dispatch({ type: "FOLLOW", data });
    } catch (error) {}
};
