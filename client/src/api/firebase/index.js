import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { customAlphabet } from "nanoid";

const firebaseConfig = {
    apiKey: "AIzaSyBGewS6QdpeqasLpp6ikZV52pefyCvR1dI",
    authDomain: "cookbook-449f1.firebaseapp.com",
    projectId: "cookbook-449f1",
    storageBucket: "cookbook-449f1.appspot.com",
    messagingSenderId: "837049800518",
    appId: "1:837049800518:web:51757d04996f52833d3747",
    measurementId: "G-BZ340Z90VZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadImage = async (image) => {
    let nanoid = customAlphabet(
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        8
    );
    const imageRef = ref(storage, `images/${image.name + nanoid()}`);
    const res = await uploadBytes(imageRef, image);
    return res.metadata.name;
};

export const getImage = async (name) => {
    const imageRef = ref(storage, `images/${name}`);
    const data = await getDownloadURL(imageRef);
    return data;
};
