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

export const getUser = (uniqueId) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(uniqueId);
        dispatch({ type: "GET_USER", data });
    } catch (error) {}
};
