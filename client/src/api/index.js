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

// User / Auth
export const signIn = (formData) => API.post("/users/signin", formData);
export const updateBio = (newBio) => API.patch("/users/updatebio", newBio);
export const fetchUser = (uniqueId) => API.get(`/users/${uniqueId}`);
export const fetchUserById = (id) => API.get(`/users/get/${id}`);
export const followUser = (form) => API.patch(`users/followuser`, form);

// Recipes
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
export const fetchPosts = (formData) =>
    API.get(
        `/posts/search?searchQuery=${formData.title || "none"}&tags=${
            formData.tags
        }`
    );

// Collections
export const addCollection = (collectionForm) =>
    API.post(`collections/new`, collectionForm);
export const getCollection = (id) => API.get(`/collections/${id}`);
export const getAllCollections = (userId) =>
    API.get(`/collections/getall/${userId}`);
export const deleteCollection = (id) => API.delete(`collections/delete/${id}`);
export const addToCollection = (formData) =>
    API.patch("/collections/add", formData);
