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
