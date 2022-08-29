import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }

    return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const updateBio = (newBio) => API.patch("/users/updatebio", newBio);
export const fetchUser = (uniqueId) => API.get(`/users/${uniqueId}`);
export const fetchUserById = (id) => API.get(`/users/get/${id}`);
export const addCollection = (collectionForm) =>
    API.patch(`users/newcollection`, collectionForm);
export const deleteCollection = (collectionForm) =>
    API.patch(`users/deletecollection`, collectionForm);
export const followUser = (form) => API.patch(`users/followuser`, form);

export const newPost = (formData) => API.post("/posts/newpost", formData);
export const fetchPost = (id) => API.get(`/posts/get/${id}`);
export const likePost = (formData) => API.patch("/posts/likepost", formData);
export const addReview = (formData) => API.patch("/posts/review/add", formData);
export const deleteReview = (formData) =>
    API.patch("/posts/review/delete", formData);
export const likeReview = (formData) =>
    API.patch("/posts/review/like", formData);
export const deleteRecipe = (id) => API.delete(`/posts/delete/${id}`);
export const updatePost = (formData) => API.patch("/posts/update", formData);

export const addToCollection = (formData) =>
    API.patch("/posts/collection", formData);
export const removeFromCollection = (formData) =>
    API.patch("/posts/collection/delete", formData);
