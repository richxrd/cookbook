import express from "express";
import {
    fetchUser,
    signin,
    updateBio,
    addCollection,
    deleteCollection,
    followUser,
    getUserById,
} from "../controllers/users.js";

const userRoutes = express.Router();

userRoutes.post("/signin", signin);
userRoutes.patch("/updatebio", updateBio);
userRoutes.get("/:uniqueId", fetchUser);
userRoutes.get("/get/:id", getUserById);
userRoutes.patch("/newcollection", addCollection);
userRoutes.patch("/deletecollection", deleteCollection);
userRoutes.patch("/followuser", followUser);

export default userRoutes;
