import * as api from "../../api/index";

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: "AUTH", data });
        navigate("/");
    } catch (error) {}
};
