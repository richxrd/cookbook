import express from "express";
import { newPost, getPost } from "../controllers/posts.js";

const postsRoutes = express.Router();

postsRoutes.post("/newpost", newPost);
postsRoutes.get("/get/:id", getPost);

export default postsRoutes;
