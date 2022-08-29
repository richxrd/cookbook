import express from "express";
import {
    addReview,
    deleteReview,
    newPost,
    getPost,
    likePost,
    likeReview,
    deletePost,
} from "../controllers/posts.js";

const postsRoutes = express.Router();

postsRoutes.post("/newpost", newPost);
postsRoutes.get("/get/:id", getPost);
postsRoutes.patch("/likepost", likePost);
postsRoutes.patch("/review/add", addReview);
postsRoutes.patch("/review/delete", deleteReview);
postsRoutes.patch("/review/like", likeReview);
postsRoutes.delete("/delete/:id", deletePost);

export default postsRoutes;
