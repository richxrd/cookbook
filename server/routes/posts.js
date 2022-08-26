import express from "express";
import { newPost, getPost, likePost } from "../controllers/posts.js";

const postsRoutes = express.Router();

postsRoutes.post("/newpost", newPost);
postsRoutes.get("/get/:id", getPost);
postsRoutes.patch("/likepost", likePost);

export default postsRoutes;
