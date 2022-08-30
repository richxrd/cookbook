import * as api from "../index";

export const addCollection = async (collectionName) => {
    try {
        const { data } = await api.addCollection(collectionName);
        return { ...data };
    } catch (error) {}
};

export const getCollection = async (id) => {
    try {
        const { data } = await api.getCollection(id);
        return { ...data };
    } catch (error) {}
};

export const getAllCollections = async (id) => {
    try {
        const { data } = await api.getAllCollections(id);
        return { ...data };
    } catch (error) {}
};

export const deleteCollection = async (id) => {
    try {
        const data = await api.deleteCollection(id);
        return { ...data };
    } catch (error) {}
};

export const addToCollection = async (formData) => {
    try {
        const { data } = await api.addToCollection(formData);
        return { ...data };
    } catch (error) {}
};
