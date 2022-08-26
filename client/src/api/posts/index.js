import * as api from "../index";

export const newPost = async (formData) => {
    try {
        const { data } = await api.newPost(formData);
        return data.post;
    } catch (error) {}
};

export const getPost = async (id) => {
    try {
        const { data } = await api.fetchPost(id);
        return data.post;
    } catch (error) {}
};

export const likePost = async (formData) => {
    try {
        const { data } = await api.likePost(formData);
        return data.post;
    } catch (error) {}
};
