import express from "express";
import {
    fetchUser,
    signin,
    updateBio,
    addCollection,
    deleteCollection,
    followUser,
} from "../controllers/users.js";

const userRoutes = express.Router();

userRoutes.post("/signin", signin);
userRoutes.patch("/updatebio", updateBio);
userRoutes.get("/:uniqueId", fetchUser);
userRoutes.patch("/newcollection", addCollection);
userRoutes.patch("/deletecollection", deleteCollection);
userRoutes.patch("/followuser", followUser);

export default userRoutes;
