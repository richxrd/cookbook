import * as api from "../index";
export const getUser = async (uniqueId) => {
    const { data } = await api.fetchUser(uniqueId);
    return { ...data };
};

export const followUser = async (form) => {
    try {
        const { data } = await api.followUser(form);
        return { ...data };
    } catch (error) {}
};

export const updateBio = async (newBio) => {
    try {
        const { data } = await api.updateBio(newBio);
        return { ...data };
    } catch (error) {}
};

export const fetchUserById = async (id) => {
    try {
        const { data } = await api.fetchUserById(id);
        return { ...data };
    } catch (error) {}
};
