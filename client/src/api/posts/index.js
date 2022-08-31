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

export const getPosts = async (formData) => {
    try {
        const { data } = await api.fetchPosts(formData);
        return data.posts;
    } catch (error) {}
};

export const getAllPosts = async (formData) => {
    try {
        const { data } = await api.fetchAllPosts(formData);
        return data.posts;
    } catch (error) {}
};

export const likePost = async (formData) => {
    try {
        const { data } = await api.likePost(formData);
        return data.post;
    } catch (error) {}
};

export const addReview = async (formData) => {
    try {
        const { data } = await api.addReview(formData);
        return data.post;
    } catch (error) {}
};

export const deleteReview = async (formData) => {
    try {
        const { data } = await api.deleteReview(formData);
        return data.post;
    } catch (error) {}
};

export const likeReview = async (formData) => {
    try {
        const { data } = await api.likeReview(formData);
        return data.post;
    } catch (error) {}
};

export const deletePost = async (id) => {
    try {
        await api.deleteRecipe(id);
    } catch (error) {}
};

export const updatePost = async (formData) => {
    try {
        const { data } = await api.updatePost(formData);
        return data.post;
    } catch (error) {}
};
